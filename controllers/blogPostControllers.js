const express = require('express');
const { BlogPost, User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, content, categoryIds, published, updated } = req.body;

        const idu = req.user;
        const use = await User.findOne({ where: { email: idu } });
        
        const blog = await BlogPost
          .create({ userId: use.id, title, content, categoryIds, published, updated });

        return res.status(201).json(blog);
    } catch (error) {
        console.log(`POST_CREATE_ERROR: ${error.message}`);
        res.status(500).json({ message: 'Internal error' });
    }
});

module.exports = router;