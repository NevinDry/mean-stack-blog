const request = require('supertest');
const app = require('../../app');
var db = require('../../db');

describe('Test Blog API', () => {
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


    it('should create a new article', async () => {
        const article = {
            content: "test",
            image: "C:fakepath.png",
            imageLink: "test.jpg",
            preview: "test",
            time: "test",
            title: "test"
        };

        return request(app)
            .post('/api/user/login')
            .send({
                name: "test",
                password: "test"
            })
            .then((response) => {
                token = response.body.data.token; // save the token!

                return request(app)
                    .post('/api/blog/addArticle')
                    .set('Authorization', 'Bearer ' + token)
                    .send(article)
                    .then((addArticleResponse) => {
                        expect(addArticleResponse.statusCode).toEqual(200);
                        expect(addArticleResponse.body.data).toBeDefined();
                    });
            });
    });

    it('It should get all article', async () => {
        const response = await request(app).get('/api/blog/getAll');
        await expect(response.statusCode).toBe(200);
        await expect(response.body.data[0]).toHaveProperty('_id');
    });

    it('It should get an article', () => {
        return request(app)
            .post('/api/user/login')
            .send({
                name: "test",
                password: "test"
            })
            .then((response) => {
                token = response.body.data.token; // save the token!
                const article = {
                    content: "test",
                    image: "C:fakepath.png",
                    imageLink: "test.jpg",
                    preview: "test",
                    time: "test",
                    title: "test"
                };

                return request(app)
                    .post('/api/blog/addArticle')
                    .set('Authorization', 'Bearer ' + token)
                    .send(article)
                    .then(async (response) => {
                        const responseGet = await request(app).get('/api/blog/getOne/' + response.body.data);
                        await expect(responseGet.statusCode).toBe(200);
                        await expect(responseGet.body.data._id).toBe(response.body.data);
                        await expect(responseGet.body.data.title).toBe("test");
                    });
            });
    });



    it('It should delete article', () => {
        return request(app)
            .post('/api/user/login')
            .send({
                name: "test",
                password: "test"
            })
            .then((response) => {
                token = response.body.data.token; // save the token!
                const article = {
                    content: "test",
                    image: "C:fakepath.png",
                    imageLink: "test.jpg",
                    preview: "test",
                    time: "test",
                    title: "test"
                };

                return request(app)
                    .post('/api/blog/addArticle')
                    .set('Authorization', 'Bearer ' + token)
                    .send(article)
                    .then(async (response) => {
                        const deleteResponse = await request(app).delete('/api/blog/article/' + response.body.data).set('Authorization', 'Bearer ' + token);
                        await expect(deleteResponse.statusCode).toBe(200);
                        await expect(deleteResponse.body.data.deletedCount).toBe(1);
                    });
            });
    });

    it('It should edit an article', () => {
        return request(app)
            .post('/api/user/login')
            .send({
                name: "test",
                password: "test"
            })
            .then((response) => {
                token = response.body.data.token;

                const article = {
                    content: "test",
                    image: "C:fakepath.png",
                    imageLink: "test.jpg",
                    preview: "test",
                    time: "test",
                    title: "test"
                };

                return request(app)
                    .post('/api/blog/addArticle')
                    .set('Authorization', 'Bearer ' + token)
                    .send(article)
                    .then((response) => {

                        const articleEdited = {
                            content: "testEdited",
                            image: "C:fakepathEdited.png",
                            imageLink: "testEdited.jpg",
                            preview: "testEdited",
                            time: "testEdited",
                            title: "testEdited"
                        };

                        return request(app)
                            .post('/api/blog/editArticle/' + response.body.data)
                            .set('Authorization', 'Bearer ' + token)
                            .send(articleEdited)
                            .then(async (editArticleResponse) => {
                                expect(editArticleResponse.statusCode).toEqual(200);
                                expect(editArticleResponse.body.data).toBeDefined();
                            });
                    });
            });
    });

    it('It should get latest article', async () => {
        const response = await request(app).get('/api/blog/getLatest?index=0&search=');
        await expect(response.statusCode).toBe(200);
        await expect(response.body.data.length).toBe(3);
    });

    afterAll(() => {
        db.disconnect();
    });
});