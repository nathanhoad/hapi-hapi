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

You can also pass an array as the fourth argument to set up special files (eg. 
robots.txt, favicon.ico) that need to be served from the root path:

```javascript
HapiHapi.assets(Server, __dirname + '/build', null, [
  __dirname + '/static/robots.txt', // Makes /robots.txt available
  __dirname + '/static/favicon.ico' // Makes /favicon.ico available
]);
```


### Views

Set up view handling (with Handlebars):

```javascript
HapiHapi = require('hapi-hapi');

// assuming a server has been created

HapiHapi.views(server, __dirname + '/views', { title: 'This is the title' });
```

Within the `views` directory you need to include a `layouts` and `partials` folder. Inside
`layouts` you need to include a `default.html` layout (or specify your own when rendering
views).

The third argument is a `context` to pass into the Handlebars views.