const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
    .usage('anydoor [options]')
    .option('p', {
        alias: 'port',
        describe: '端口号',
        default: 9988
    })
    .option('h', {
        alias: 'host',
        describe: '主机名',
        default: 'localhost'
    })
    .option('d', {
        alias: 'root',
        describe: 'root path',
        default: process.cwd()
    })
    .version()
    .alias('v', 'version')
    .help()
    .argv;

const server = new Server(argv);
server.start();
