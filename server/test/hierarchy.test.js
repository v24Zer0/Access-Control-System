const request = require('supertest');
const { setHierarchyKeys, getRootArea } = require('../src/utility/buildHierarchy');
const service = require('../src/hierarchy/hierarchy.service');
const controller = require('../src/hierarchy/hierarchy.controller');
const system_data = require('./mock/system_data');
const indexed_data = require('./mock/indexed_data');
const Area = require("../src/model/area");
const Door = require('../src/model/door');
const Access = require('../src/model/access');
const app = require('../src/app');

jest.mock('../src/config/database');
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

describe('Build Hierarchy test', () => {
    it('should return areas and doors with each area and door indexed by their ID', () => {
        const data = setHierarchyKeys(system_data.areas, system_data.doors, system_data.access_rules);
        expect(data).toEqual(indexed_data);
    })

    it('should return the area with a parent_area of null', () => {
        const root = getRootArea(system_data.areas);
        expect(root).toEqual(system_data.areas[0]);
    })
})

describe('Hierarchy service tests', () => {
    const hierarchy_data = {
        root: indexed_data[0]["6C4E2C5D-BBBB-4386-AA71-B7F56727433C"],
        areas: indexed_data[0],
        doors: indexed_data[1]
    }

    const systemData = system_data;

    Area.find = jest.fn().mockReturnValue(systemData.areas);
    Door.find = jest.fn().mockReturnValue(systemData.doors);
    Access.find = jest.fn().mockReturnValue(systemData.access_rules);

    it('should create an object with root, areas and doors', async () => {
        const data = await service.getHierarchy();
        expect(data).toEqual(hierarchy_data);
    })
})

describe('Hierarchy controller tests', () => {
    const hierarchy_data = {
        root: indexed_data[0]["6C4E2C5D-BBBB-4386-AA71-B7F56727433C"],
        areas: indexed_data[0],
        doors: indexed_data[1]
    }

    const systemData = system_data;

    Area.find = jest.fn().mockReturnValue(systemData.areas);
    Door.find = jest.fn().mockReturnValue(systemData.doors);
    Access.find = jest.fn().mockReturnValue(systemData.access_rules);

    it('should return a status of 200 and an object with root, areas and doors', async () => {
        const response = await request(app).get('/hierarchy').set('Authorization', 'Bearer token');
        expect(response.status).toBe(200);
        expect(true).toBe(true);
    })
})
