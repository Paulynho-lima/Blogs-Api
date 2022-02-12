const { BlogPost, User, Category } = require('../models');

const getBlogPostControllers = async (req, res, next) => {
    try {
        const posts = await BlogPost.findAll({
            include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },

              { model: Category, as: 'categories', through: { attributes: [] } }],
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(`GET_ERROR_POST: ${error.message}`);
       next(error);
    }
};

const getBlogPostByIdControl = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const blog = await BlogPost.findOne({
            where: { id },
            include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
              { model: Category, as: 'categories', through: { attributes: [] } }],
        });

        if (!blog) return res.status(404).json({ message: 'Post does not exist' });

        return res.status(200).json(blog);
    } catch (error) {
        console.log(`POST_ERROR_BAY_ID: ${error.message}`);
        next(error);
    }
};

module.exports = {
    getBlogPostControllers,
    getBlogPostByIdControl,
};