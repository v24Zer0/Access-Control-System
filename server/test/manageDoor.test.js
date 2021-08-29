const request = require('supertest');
const service = require('../src/manageDoor/manageDoor.service');
const controller = require('../src/manageDoor/manageDoor.controller');
const Door = require('../src/model/door');
const app = require('../src/app');

jest.mock('../src/config/database');
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

describe('Manage Door service tests', () => {
    it('should successfully lock door', async () => {
        Door.findByIdAndUpdate = jest.fn().mockReturnValue({ status: 'open' });
        const result = await service.lockDoor('doorId');
        expect(result).toBe(service.Result.SUCCESS);
    })

    it('should successfully unlock door', async () => {
        Door.findByIdAndUpdate = jest.fn().mockReturnValue({ status: 'closed' });
        const result = await service.unlockDoor('doorId');
        expect(result).toBe(service.Result.SUCCESS);
    })

    it('should not lock door, door id id incorrect', async () => {
        Door.findByIdAndUpdate = jest.fn().mockReturnValue(null);
        const result = await service.lockDoor('doorId');
        expect(result).toBe(service.Result.INVALID);
    })

    it('should not unlock door, door id id incorrect', async () => {
        Door.findByIdAndUpdate = jest.fn().mockReturnValue(null);
        const result = await service.unlockDoor('doorId');
        expect(result).toBe(service.Result.INVALID);
    })

    it('should not lock door, door is already locked', async () => {
        Door.findByIdAndUpdate = jest.fn().mockReturnValue({ status: 'closed' });
        const result = await service.lockDoor('doorId');
        expect(result).toBe(service.Result.FAIL);    })

    it('should not unlock door, door is already unlocked', async () => {
        Door.findByIdAndUpdate = jest.fn().mockReturnValue({ status: 'open' });
        const result = await service.unlockDoor('doorId');
        expect(result).toBe(service.Result.FAIL);    
    })
})

describe('Manage Door controller tests', () => {
    it('should return status code 200 and a message of "Success"', async () => {
        service.unlockDoor = jest.fn().mockReturnValue(service.Result.SUCCESS);
        const response = await request(app).post('/door/unlock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Success' });
    })

    it('should return status code 409 with message "Door is already open"', async () => {
        service.unlockDoor = jest.fn().mockReturnValue(service.Result.FAIL);
        const response = await request(app).post('/door/unlock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: 'Door is already open' });
    })

    it('should return status code 400 with message "Door ID is invalid"', async () => {
        service.unlockDoor = jest.fn().mockReturnValue(service.Result.INVALID);
        const response = await request(app).post('/door/unlock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Door ID is invalid' });
    })

    it('should return status code 500 with message "Something went wrong"', async () => {
        service.unlockDoor = jest.fn().mockReturnValue(4);
        const response = await request(app).post('/door/unlock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Something went wrong' });    
    })

    it('should return status code 200 and a message of "Success"', async () => {
        service.lockDoor = jest.fn().mockReturnValue(service.Result.SUCCESS);
        const response = await request(app).post('/door/lock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Success' });
    })

    it('should return status code 409 with message "Door is already closed"', async () => {
        service.lockDoor = jest.fn().mockReturnValue(service.Result.FAIL);
        const response = await request(app).post('/door/lock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: 'Door is already closed' });    })

    it('should return status code 400 with message "Door ID is invalid"', async () => {
        service.lockDoor = jest.fn().mockReturnValue(service.Result.INVALID);
        const response = await request(app).post('/door/lock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Door ID is invalid' });    
    })

    it('should return status code 500 with message "Something went wrong"', async () => {
        service.lockDoor = jest.fn().mockReturnValue(4);
        const response = await request(app).post('/door/lock').set('Authorization', 'Bearer token').send({ door: 'id' });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Something went wrong' });    
    })
})  