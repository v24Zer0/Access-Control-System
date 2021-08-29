const { Router } = require('express');
const { verifyToken } = require('../middleware/auth');
const { getHierarchy } = require('./hierarchy.service');

const router = Router();

// verifyToken

router.get('/hierarchy', verifyToken, async (req, res) => {
    const data = await getHierarchy();
    res.status(200).json(data);
});

module.exports = router;