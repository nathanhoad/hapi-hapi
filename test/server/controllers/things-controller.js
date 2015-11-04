module.exports = [
    {
        method: 'GET',
        path: '/things',
        config: {
            handler: function (request, reply) {
                reply('GET /things');
            }
        }
    },
    {
        method: 'POST',
        path: '/things',
        config: {
            handler: function (request, reply) {
                reply('POST /things');
            }
        }
    },
    {
        method: 'GET',
        path: '/things/{thing}',
        config: {
            handler: function (request, reply) {
                reply('GET /things/{thing}');
            }
        }
    },
    {
        method: 'PUT',
        path: '/things/{thing}',
        config: {
            handler: function (request, reply) {
                reply('PUT /things/{thing}');
            }
        }
    },
    {
        method: 'DELETE',
        path: '/things/{thing}',
        config: {
            handler: function (request, reply) {
                reply('DELETE /things/{thing}');
            }
        }
    }
];