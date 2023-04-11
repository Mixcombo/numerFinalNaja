const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./index'); 

const secretKeys = "mixer";

describe('GET /gettoken/:name', () => {
    it('responds with a token', async () => {
        const response = await request(app).get('/gettoken/mixer').expect(200);
        const decode = jwt.verify(response.text,secretKeys);
        expect(decode.user).toBe("mixer")
    });
});
