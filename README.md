# Hapi Hapi

A collection of helpers for setting up a Hapi server.


## Usage

### Controllers

Require a directory tree of controllers/routes:

```javascript
HapiHapi = require('hapi-hapi');

// assuming a server has been created

HapiHapi.controllers(server, __dirname + '/controllers');
```


### Assets

Create a route for serving static assets:

```javascript
HapiHapi = require('hapi-hapi');

// assuming a server has been created

HapiHapi.assets(server, __dirname + '/build', '/assets/{param*}');
```