const request = require('supertest');
const app = require('../../app');
var db = require('../../db');

describe('Test Upload API', () => {
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


    it('should add a image', async () => {
        var FormData = require('form-data');
        var fs = require('fs');

        var form = new FormData();

        form.append('file', fs.createReadStream('sample.png'));

        console.log(form);

        return request(app)
            .post('/api/upload/uploadImage/test')
            .send(form)
            // .set('Content-Type', 'multipart/form-data; boundary=$'+ form.getBoundary())
            // .set('Accept', 'application/json, text/plain, */*')
            .then((response) => {
                console.log(response.body);
                expect(response.statusCode).toEqual(200);
                
            });
    });


    afterAll(() => {
        db.disconnect();
    });
});