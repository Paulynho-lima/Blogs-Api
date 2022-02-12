const { BlogPost, User, Category } = require('../models');

const getBlogPostControllers = async (req, res, next) => {
    try {
        const posts = await BlogPost.findAll({
            include: [{ model: User, as: 'user' },
            
              { model: Category, as: 'categories', through: { attributes: [] } }],
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(`GET_ERROR_POST: ${error.message}`);
       next(error);
    }
};

module.exports = {
    getBlogPostControllers,
};