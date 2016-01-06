var Lab = require('lab'),
    Should = require('should'),
    Server = require('./server');

var HapiHapi = require('..');

    
var lab = Lab.script();
exports.lab = lab;

lab.experiment('Hapi Hapi', function () {
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
                done();
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
    });
    
    
    lab.suite('Templates', function () {
        lab.test('loads a template compiler', function (done) {
            var view = HapiHapi.view(__dirname + '/server/views/template.html', { reason: 'compiling templates' });
            
            view.should.containEql('compiling templates');
            done();
        });
    });
});