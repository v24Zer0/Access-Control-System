const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const doorService = require('./manageDoor.service');

const router = Router();

router.post('/door/unlock', verifyToken, async (req, res) => {
    const doorId = req.body.door;
    const result = await doorService.unlockDoor(doorId);
    switch(result) {
        case doorService.Result.SUCCESS:
            res.status(200).json({ message: 'Success' });
            break;
        case doorService.Result.FAIL:
            res.status(409).json({ message: 'Door is already open' });
            break;
        case doorService.Result.INVALID:
            res.status(400).json({ message: 'Door ID is invalid' });
            break;
        default: 
            res.status(500).json({ message: 'Something went wrong' });
            break;
    }
});

router.post('/door/lock', verifyToken, async (req, res) => {
    const doorId = req.body.door;
    const result = await doorService.lockDoor(doorId);
    switch(result) {
        case doorService.Result.SUCCESS:
            res.status(200).json({ message: 'Success' });
            break;
        case doorService.Result.FAIL:
            res.status(409).json({ message: 'Door is already closed' });
            break;
        case doorService.Result.INVALID:
            res.status(400).json({ message: 'Door ID is invalid' });
            break;
        default: 
            res.status(500).json({ message: 'Something went wrong' });
            break;
    }
});

module.exports = router;