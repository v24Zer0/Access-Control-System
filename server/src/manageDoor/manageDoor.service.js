const Door = require('../model/door');

const Result = {
    SUCCESS: 0,
    FAIL: 1,
    INVALID: 2
}

async function unlockDoor(doorId) {
    const door = await Door.findByIdAndUpdate(doorId, { status: 'open' }, { useFindAndModify: false });
    if(door == null) {
        // door not found, incorrect id
        return Result.INVALID;
    }
    if(door.status === 'open') return Result.FAIL;
    return Result.SUCCESS;
}  

async function lockDoor(doorId) {
    const door = await Door.findByIdAndUpdate(doorId, { status: 'closed' }, { useFindAndModify: false });
    if(door == null) {
        // door not found, incorrect id
        return Result.INVALID;
    }
    if(door.status === 'closed') return Result.FAIL;
    return Result.SUCCESS;
}

const doorService = {
    unlockDoor,
    lockDoor,
    Result
}

module.exports = doorService;