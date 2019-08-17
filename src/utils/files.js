const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const compress = require('./compress');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function(req, res, filePath, conf) {
    try {
        const status = await stat(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        if (status.isFile()) {
            let rs = fs.createReadStream(filePath);
            // 判断缓存是否失效
            if (isFresh(status, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (status.isDirectory()) {
            const files = await readdir(filePath);
            res.setHeader('Content-Type', 'text/html');
            const dir =  path.relative(conf.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            };
            res.end(template(data));
        }
    } catch (err) {
        console.error(err);
        // res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file!`);
    }
};