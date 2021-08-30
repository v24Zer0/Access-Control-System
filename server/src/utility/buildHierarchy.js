function setHierarchyKeys(areas, doors, access_rules) {
    const indexedAreas = setAreaKeys(areas);
    const indexedDoors = setDoorKeys(doors, indexedAreas);
    const newDoors = setAccesRulesKeys(access_rules, indexedDoors, indexedAreas);
    return [indexedAreas, indexedDoors];
}

function setAreaKeys(areas) {
    const indexedAreas = {};
    for(area of areas) {
        indexedAreas[area._id] = {
            name: area.name,
            parent_area: area.parent_area,
            child_area_ids: area.child_area_ids,
            doors: [],
            access_rules: {}
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
            parent_area: door.parent_area
        };
        areas[door.parent_area].doors.push(door._id);
    }
    return indexedDoors;
}

function setAccesRulesKeys(access_rules, doors, areas) {
    for(rules of access_rules) {
        for(door of rules.doors) {
            areas[doors[door].parent_area].access_rules[rules.name] = true;
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