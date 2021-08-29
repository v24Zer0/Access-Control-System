const { Router } = require('express');
const { generateToken } = require('../middleware/auth');
const service = require('./login.service');

const router = Router();
const Result = service.Result;

router.post('/login', async (req, res) => {
    const result = await service.login(req.body);
    switch(result) {
        case Result.SUCCESS:
            const signedToken = generateToken(req.body.username);
            res.cookie('token', signedToken, { httpOnly: true });
            res.status(200).json({token: signedToken});
            break;
        case Result.FAIL:
            res.status(401).json({message: 'Username or password is incorrect'});
            break;
        case Result.INVALID:
            res.status(400).json({message: 'One or more fields are missing'});
            break;
        default:
            res.status(500).json({message: 'Something went wrong'});
            break;
    }
});

module.exports = router;