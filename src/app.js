const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const func = require('./utils/files');
const openUrl = require('./utils/openUrl');

class Server {
    constructor(config) {
        this.conf = { ...conf, ...config };
    }
    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            func(req, res, filePath, this.conf);
        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Server started at ${chalk.green(addr)}`);
            openUrl(addr);
        });
    }
}

module.exports = Server;