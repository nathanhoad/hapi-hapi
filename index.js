var FS = require('fs'),
    RequireTree = require('require-tree'),
    Inert = require('inert'),
    Vision = require('vision'),
    Handlebars = require('handlebars');


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
    },
    
    
    views: function (server, path, context) {
        server.register(Vision, function () {
            server.views({
                engines: {
                    html: Handlebars
                },
                path: path,
                layoutPath: path + '/layouts',
                partialsPath: path + '/partials',
                layout: 'default',
                context: context
            });
        });
    },
    
    
    view: function (path, locals) {
        locals = locals || {};
        
        var view = Handlebars.compile(FS.readFileSync(path, 'utf8'));
        
        return view(locals);
    }
    
}


module.exports = HapiHapi;