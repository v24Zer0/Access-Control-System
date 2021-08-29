const { verifyToken, generateToken, validatePassword, hashPassword } = require('../src/middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const { response } = require('express');

const jwtSign = jest.spyOn(jwt, 'sign');
const jwtVerify = jest.spyOn(jwt, 'verify');
process.env.TOKEN_SECRET = 'secret';

describe('Verify token tests', () => {
    it('should call jwt.verify once', () => {
        jwtVerify.mockReturnValue(() => {});
        const request = express.request;
        request.headers = {
            authorization: 'Bearer token'
        }
        verifyToken(request, express.response, () => {});
        expect(jwtVerify).toHaveBeenCalledTimes(1);
    })

    it('should return a status code of 403 because there was no Authorization header', () => {
        const request = express.request;
        const response = express.response;
        response.send = jest.fn();
        request.headers = {};
        verifyToken(request, response, () => {});
        expect(response.statusCode).toBe(403);
    })

    it('should return a status code of 403 because the Authorization header was incorrect', async () => {
        const request = express.request;
        request.headers = {
            authorization: 'token'
        }
        const response = express.response;
        response.send = jest.fn();
        verifyToken(request, response, () => {});
        expect(response.statusCode).toBe(403);
    })
})

describe('Generate token tests', () => {
    it('should call jwt.sign once', () => {
        generateToken('username');
        expect(jwtSign).toHaveBeenCalledTimes(1);
    })
})

describe('Hash password tests', () => {
    const bcryptHash = jest.spyOn(bcrypt, 'hash');

    it('should call bcrypt.hash once', async () => {
        hashPassword('password');
        expect(bcryptHash).toHaveBeenCalledTimes(1);
    })
})

describe('Validate password tests', () => {
    it('should return true because the passwords match', async () => {
        const hash = bcrypt.hashSync('password', 10);
        const result = await validatePassword('password', hash);
        expect(result).toBe(true);
    })

    it('should return false because the passwords do not match', async () => {
        const hash = bcrypt.hashSync('incorrectPassword', 10);
        const result = await validatePassword('password', hash);
        expect(result).toBe(false);
    })
})