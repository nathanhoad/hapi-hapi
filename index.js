var RequireTree = require('require-tree'),
    Inert = require('inert');


var HapiHapi = {
    
    controllers: function (server, directory) {
        RequireTree(directory, { 
            filter: /^[^_]/,
            each: function (controller) {
                server.route(controller);
            }
        });
    },
    
    
    assets: function (server, directory, path) {
        if (!path) path = '/assets/{param*}';
        
        server.register(Inert, function () {});
        
        server.route({
            method: 'GET',
            path: path,
            handler: {
                directory: {
                    path: directory
                }
            }
        });
    }
    
}


module.exports = HapiHapi;