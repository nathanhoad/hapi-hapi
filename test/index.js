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
});