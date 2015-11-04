module.exports = [
    {
        method: 'GET',
        path: '/pizzas',
        config: {
            handler: function (request, reply) {
                reply('GET /pizzas');
            }
        }
    },
    {
        method: 'POST',
        path: '/pizzas',
        config: {
            handler: function (request, reply) {
                reply('POST /pizzas');
            }
        }
    },
    {
        method: 'GET',
        path: '/pizzas/{pizza}',
        config: {
            handler: function (request, reply) {
                reply('GET /pizzas/{pizza}');
            }
        }
    },
    {
        method: 'PUT',
        path: '/pizzas/{pizza}',
        config: {
            handler: function (request, reply) {
                reply('PUT /pizzas/{pizza}');
            }
        }
    },
    {
        method: 'DELETE',
        path: '/pizzas/{pizza}',
        config: {
            handler: function (request, reply) {
                reply('DELETE /pizzas/{pizza}');
            }
        }
    }
];