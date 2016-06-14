var Hapi = require('hapi');
var Lab = require('lab');
var Should = require('should');

var HapiHapi = require('..');

    
var lab = Lab.script();
exports.lab = lab;

lab.experiment('Hapi Hapi', function () {
    var Server;
    
    
    lab.beforeEach(function (done) {
        Server = new Hapi.Server();
        Server.connection({ port: 5000 });
        Server.route([{
            method: 'GET',
            path: '/',
            config: {
                handler: function (request, reply) {
                    reply.view('home');
                }
            }
        }]);
        done();
    });
    
    
    lab.suite('Controller Setup', function () {
        lab.test('maps controllers', function (done) {
            HapiHapi.controllers(Server, __dirname + '/server/controllers');
            
            Server.inject({ method: 'GET', url: '/things' }, function (response) {
                response.statusCode.should.equal(200);
                response.result.should.equal('GET /things');
                
                Server.inject({ method: 'GET', url: '/pizzas'}, function (response) {
                    response.statusCode.should.equal(200);
                    response.result.should.equal('GET /pizzas');
                    
                    Server.inject({ method: 'GET', url: '/ignored'}, function (response) {
                        response.statusCode.should.equal(404);
                        done();
                    });
                });
            });
        });
    });
    
    
    lab.suite('Assets Setup', function () {
        lab.test('maps an assets directory', function (done) {
            HapiHapi.assets(Server, __dirname + '/server/assets');
            
            Server.inject({ method: 'GET', url: '/assets/thing.txt' }, function (response) {
                response.statusCode.should.equal(200);
                response.result.should.equal('This is an asset.');
                done();
            });
        });
        
        
        lab.test('can handle special files', function (done) {
            HapiHapi.assets(Server, __dirname + '/server/assets', null, [
                __dirname + '/server/static/robots.txt',
                __dirname + '/server/static/favicon.ico'
            ]);
            
            Server.inject({ method: 'GET', url: '/assets/thing.txt' }, function (response) {
                response.statusCode.should.equal(200);
                response.result.should.equal('This is an asset.');
                
                Server.inject({ method: 'GET', url: '/robots.txt' }, function (response) {
                    response.statusCode.should.equal(200);
                    response.result.should.equal('User-agent: *\nDisallow: /');
                    
                    Server.inject({ method: 'GET', url: '/favicon.ico' }, function (response) {
                        response.statusCode.should.equal(200);
                        done();
                    });
                });
            });
        });
    });
    
    
    lab.suite('Views Setup', function () {
        lab.test('maps a views directory', function (done) {
            HapiHapi.views(Server, __dirname + '/server/views', { title: 'This is the title' });
            
            Server.inject({ method: 'GET', url: '/' }, function (response) {
                response.statusCode.should.equal(200);
                response.result.should.containEql('This is the title');
                done();
            });
        });
        
        lab.test('allows path overrides', function (done) {
            HapiHapi.views(Server, { 
                path: __dirname + '/server/views', 
                layoutPath: __dirname + '/server/views/alternative-layouts',
                layout: 'alternative-default'
            }, {
                title: 'Title'
            });
            
            Server.inject({ method: 'GET', url: '/' }, function (response) {
                response.statusCode.should.equal(200);
                response.result.should.containEql('Alternative Title');
                done();
            });
        });
    });
    
    
    lab.suite('Templates', function () {
        lab.test('loads a template compiler', function (done) {
            var view = HapiHapi.view(__dirname + '/server/views/template.html', { reason: 'compiling templates' });
            
            view.should.containEql('compiling templates');
            done();
        });
    });
});