const request = require('supertest');
const app = require('../../app');
var db = require('../../db');

describe('Test User API', () => {
    beforeAll(() => {
        return new Promise(resolve => {
            db.connect('mongodb://localhost:27017', 'mean-blog-test', function (err) {
                if (err) {
                    console.log('Unable to connect to Mongo.');
                    reject();
                } else {
                    console.log('Mongo connected');
                    resolve();
                }
            });
        });
    });


    it('should log a user', async () => {
        return request(app)
            .post('/api/user/login')
            .send({
                name: "test",
                password: "test"
            })
            .then((response) => {
                token = response.body.data.token; // save the token!
                expect(response.statusCode).toEqual(200);
                expect(response.body.data).toBeDefined();
                expect(response.body.data).toHaveProperty('token');
            });
    });

    it('should be unauthorized without token', async () => {
        return request(app)
        .post('/api/blog/addArticle')
        .send({})
        .then((addArticleResponse) => {
            expect(addArticleResponse.statusCode).toEqual(401);
        });
    });


    afterAll(() => {
        db.disconnect();
    });
});