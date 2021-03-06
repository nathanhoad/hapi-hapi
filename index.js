var FS = require('fs'),
    Path = require('path'),
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
    
    
    assets: function (server, directory, path, special_files) {
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
        
        if (special_files) {
            special_files.forEach(function (file) {
                server.route({
                    method: 'GET',
                    path: '/' + Path.basename(file),
                    handler: {
                        file: file
                    }
                });
            });
        }
    },
    
    
    views: function (server, path_or_config, context) {
        var config;
        
        if (typeof path_or_config == "string") {
            var path = path_or_config;
            config = {
                path: path,
                layoutPath: path + '/layouts',
                partialsPath: path + '/partials',
                layout: 'default'
            };
        } else {
            config = path_or_config;
        }
        
        if (typeof config.layoutPath == "undefined") {
            config.layout = false;
        }
        
        var config = Object.assign({
            engines: {
                html: Handlebars
            },
            context: context
        }, config);
        
        server.register(Vision, function () {
            server.views(config);
        });
    },
    
    
    view: function (path, locals) {
        locals = locals || {};
        
        var view = Handlebars.compile(FS.readFileSync(path, 'utf8'));
        
        return view(locals);
    }
}


module.exports = HapiHapi;