const express = require('express');
const { Category } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const cate = await Category.create({ name });
         console.log(cate);
        return res.status(201).json(cate);
    } catch (error) {
        console.log(`POST_CREATE_CATEGORIES: ${error.message}`);
        res.status(500).json({ message: 'Internal error' });
    }
});

module.exports = router;