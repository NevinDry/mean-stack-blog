const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
    test('It should response the GET method', async (done) => {
      const response = await request(app).get('/');
      await expect(response.statusCode).toBe(200);
      done();
    });
})