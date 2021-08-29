const request = require('supertest');
const service = require('../src/login/login.service');
const controller = require('../src/login/login.controller');
const app = require('../src/app');
const User = require('../src/model/user');
const bcrypt = require('bcrypt');

jest.mock('../src/config/database');

describe('Login service tests', () => {
    it('should return INVALID, missing username', async () => {
        const result = await service.login({ password: 'password' });
        expect(result).toBe(service.Result.INVALID);
    })

    it('should return INVALID, missing password', async () => {
        const result = await service.login({ username: 'username' });
        expect(result).toBe(service.Result.INVALID);
    })

    it('should return FAIL, username not found', async () => {
        User.findOne = jest.fn().mockReturnValue(null);
        const result = await service.login({ username: 'username', password: 'password' });
        expect(result).toBe(service.Result.FAIL);
    })

    it('should return FAIL, password incorrect', async () => {
        const hash = await bcrypt.hash('incorrectPassword', 10);
        User.findOne = jest.fn().mockReturnValue({ username: 'username', password: hash });
        const result = await service.login({ username: 'username', password: 'password' });
        expect(result).toBe(service.Result.FAIL);
    })

    it('should return SUCCESS, all details correct', async () => {
        const hash = await bcrypt.hash('password', 10);
        User.findOne = jest.fn().mockReturnValue({ username: 'username', password: hash });
        const result = await service.login({ username: 'username', password: 'password' });
        expect(result).toBe(service.Result.SUCCESS);
    })
})

describe('Login controller test', () => {
    it('should return a status of 500 with a message of "Something went wrong", server error', async () => {
        service.login = jest.fn().mockReturnValue(Promise.resolve(4));
        const res = await request(app).post('/login').send({ username: 'username', password: 'password' });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Something went wrong');
    })

    it('should return a status of 400 with a message of "One or more fields are missing", missing fields in request', async () => {
        service.login = jest.fn().mockReturnValue(Promise.resolve(service.Result.INVALID));
        const res = await request(app).post('/login').send({ username: 'username', password: 'password' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('One or more fields are missing');
    })

    it('should return a status of 401 with a message of "Username or password is incorrect", incorrect details', async () => {
        service.login = jest.fn().mockReturnValue(Promise.resolve(service.Result.FAIL));
        const res = await request(app).post('/login').send({ username: 'username', password: 'password' });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Username or password is incorrect');
    })

    it('should return a status of 200 with an object containing a token, successful login', async () => {
        service.login = jest.fn().mockReturnValue(Promise.resolve(service.Result.SUCCESS));
        const res = await request(app).post('/login').send({ username: 'username', password: 'password' });
        expect(res.status).toBe(200);
        expect(res.body.token).not.toBeNull();
    })
})