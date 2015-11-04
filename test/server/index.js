var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
    port: process.env.PORT || 5000
});

module.exports = server;