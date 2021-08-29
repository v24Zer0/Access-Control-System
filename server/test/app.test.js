const request = require('supertest');
const app = require('../src/app');
const connect = require('../src/config/database');

jest.mock('../src/config/database');

describe('App tests', () => {
    it('should call connect once', async () => {
        const response = await request(app).get('/');
        expect(connect).toHaveBeenCalledTimes(1);
    })

    it('should return a status code of 404', async () => {
        const response = await request(app).get('/incorrectRoute');
        expect(response.status).toBe(404);
    })
})