const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const systemService = require('./system.service');

const router = Router();

//verifyToken
router.post('/system', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    systemService.addSystemData(req.body);
    res.sendStatus(201);
});

module.exports = router;