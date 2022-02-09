const express = require('express');

const router = express.Router();
const { generateToken } = require('../auth/tokenConfig');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const geraTok = generateToken(email, password);
        return res.status(200).json({ token: geraTok });
    } catch (error) {
        console.log(`POST CREATELOGIN: ${error.message}`);
        res.status(500).json({ message: 'Internal error' });
    }
});

module.exports = router;