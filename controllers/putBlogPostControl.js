const express = require('express');
const { User, BlogPost, Category } = require('../models');
/*
const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { title, content } = req.body;

         await BlogPost.update({ title, content },
         { where: { id } });
         
         const blog = await BlogPost.findOne({
            where: { id },
            attributes: { exclude: ['id', 'published', 'updated', 'UserId'] },
            include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
        });

        return res.status(200).json(blog);  
    } catch (error) {
        console.log(`POST_ERROR_PUT_BLOGPOST: ${error.message}`);
        res.status(500).json({ message: 'Internal error' });
    }
});

module.exports = router; */

const putBlogPostControl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const idu = req.user;
      const users = await User.findOne({ where: { email: idu } });
      const use = await BlogPost.findOne({ where: { userId: users.id } });
if (use.userId !== users.id) return res.status(401).json({ message: 'Unauthorized user' }); 
await BlogPost.update({ title, content },
         { where: { id } });
         const blog = await BlogPost.findOne({
            where: { id },
            attributes: { exclude: ['id', 'published', 'updated', 'UserId'] },
            include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
        });
       return res.status(200).json(blog);  
    } catch (error) {
        console.log(`POST_ERROR_PUT_BLOGPOST: ${error.message}`);
        next(error);
    }
};

module.exports = {
    putBlogPostControl,
}; 