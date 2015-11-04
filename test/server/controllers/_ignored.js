module.exports = [
    {
        method: 'GET',
        path: '/ignored',
        config: {
            handler: function (request, reply) {
                reply('GET /ignored');
            }
        }
    }
];