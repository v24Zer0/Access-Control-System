const Area = require("../model/area");
const Door = require('../model/door');
const Access = require('../model/access');
const { setHierarchyKeys, getRootArea } = require("../utility/buildHierarchy");

async function getHierarchy() {
    const areas = await getAreas();
    const doors = await getDoors();
    const access_rules = await getAccessRules();
    const [indexedAreas, indexedDoors] = setHierarchyKeys(areas, doors, access_rules);
    const rootArea = getRootArea(indexedAreas);
    const response = {
        root: rootArea,
        areas: indexedAreas,
        doors: indexedDoors
    }
    return response;
}

async function getAreas() {
    const data = await Area.find();
    return data;
}

async function getDoors() {
    const data = await Door.find();
    return data;
}

async function getAccessRules() {
    const data = await Access.find();
    return data;
}

const hierarchyService = {
    getHierarchy
}

module.exports = hierarchyService;