const User = require('../model/user');
const { validatePassword } = require('../middleware/auth');

const Result = {
    SUCCESS: 0,
    FAIL: 1,
    INVALID: 2
}

async function login(userDetails) {
    if(!userDetails.username || !userDetails.password) {
        return Result.INVALID;
    }
    const user = await User.findOne({username: userDetails.username});
    if(user == null) {
        return Result.FAIL;
    }
    const valid = await validatePassword(userDetails.password, user.password);
    if(!valid) {
        return Result.FAIL;
    }
    return Result.SUCCESS;
}

const service = {
    login,
    Result
}

module.exports = service;