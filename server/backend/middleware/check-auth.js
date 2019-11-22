var expressJwt = require('express-jwt');
var config = require('../config.json');

const tokenAuthCheck = expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({
    path: [
        '/api/user/login',
        '/api/blog/getLatest',
        '/api/blog/getAll',
        '/api/blog/getTags/',
        /^\/api\/blog\/getOne\/.*/
    ]
});


module.exports = tokenAuthCheck;