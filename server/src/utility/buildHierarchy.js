function setHierarchyKeys(areas, doors, access_rules) {
    const indexedAreas = setAreaKeys(areas);
    const indexedDoors = setDoorKeys(doors, indexedAreas);
    const newDoors = setAccesRulesKeys(access_rules, indexedDoors);
    return [indexedAreas, indexedDoors];
}

function setAreaKeys(areas) {
    const indexedAreas = {};
    for(area of areas) {
        indexedAreas[area._id] = {
            name: area.name,
            parent_area: area.parent_area,
            child_area_ids: area.child_area_ids,
            doors: []
        };
    }
    return indexedAreas;
}

function setDoorKeys(doors, areas) {
    const indexedDoors = {};
    for(key in doors) {
        const door = doors[key];
        indexedDoors[door._id] = {
            name: door.name,
            status: door.status,
            access_rules: []
        };
        areas[door.parent_area].doors.push(door._id);
    }
    return indexedDoors;
}

function setAccesRulesKeys(access_rules, doors) {
    for(rules of access_rules) {
        for(door of rules.doors) {
            doors[door].access_rules.push(rules.name);
        }
    }
    return doors;
}

function getRootArea(areas) {
    for(key in areas) {
        if(areas[key].parent_area == null)
            return areas[key];
    }
}

module.exports = {
    setHierarchyKeys,
    getRootArea
}