const Access = require("../model/access");
const Door = require("../model/door");
const User = require("../model/user");
const Area = require('../model/area');
const { hashPassword } = require("../middleware/auth");

function addSystemData(systemData) {
    Object.keys(systemData).forEach((key) => {
        switch(key) {
            case 'registered_users':
                addUsers(systemData.registered_users);
                break;
            case 'system_data':
                splitAndAddData(systemData.system_data);
                break;
            default: 
                break;
        }
        console.log(key);
    });
}

function splitAndAddData(systemData) {
    Object.keys(systemData).forEach((key) => {
        switch(key) {
            case 'areas':
                addAreas(systemData.areas);
                break;
            case 'doors':
                addDoors(systemData.doors);
                break;
            case 'access_rules':
                addAccessRules(systemData.access_rules);
                break;
            default: 
                break;
        }
        console.log(key);
    });
}

async function addUsers(users) {
    const userData = [];

    for(user of users) {
        const hash = await hashPassword(user.password);
        user.password = hash;
        userData.push(user);
    }
    if(userData.length > 0) {
        try {
            await User.insertMany(userData);
        } catch(error) {
            console.log(error);
        }
    }
}

async function addDoors(doors) {
    const doorData = [];
    Array.from(doors).forEach((door) => {
        console.log(door);
        doorData.push(new Door({
            _id: door.id,
            ...door
        }));
    });
    if(doorData.length > 0) {
        try {
            await Door.insertMany(doorData);
        } catch(error) {
            console.log(error);
        }
    }
}

async function addAccessRules(rules) {
    const accessData = [];
    Array.from(rules).forEach((rule) => {
        console.log(rule);
        accessData.push(new Access({
            _id: rule.id,
            ...rule
        }));
    });
    if(accessData.length > 0) {
        try {
            await Access.insertMany(accessData);
        } catch(error) {
            console.log(error);
        }
    }
}

async function addAreas(areas) {
    const areaData = [];
    Array.from(areas).forEach((area) => {
        console.log(area);
        areaData.push(new Area({
            _id: area.id,
            ...area
        }));
    });
    if(areaData.length > 0) {
        try {
            await Area.insertMany(areaData);
        } catch(error) {
            console.log(error);
        }
    }
}

const systemService = {
    addSystemData
}

module.exports = systemService;