const { Category } = require('../models');

 const getCategoryController = async (req, res, next) => {
    try {
      const users = await Category.findAll();
        console.log(users);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }; 
  
  module.exports = {
      getCategoryController,
  };
