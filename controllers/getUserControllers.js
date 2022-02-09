const { User } = require('../models');

 const getUserController = async (req, res, next) => {
    try {
      const users = await User.findAll();
        console.log(users);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }; 

const getUserByIdControler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const useId = await User.findByPk(id);

      if (!useId) return res.status(404).json({ message: 'User does not exist' });
       
      return res.status(200).json(useId);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };

/* router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const useId = await User.findByPk(id);

        if (!useId) return res.status(404).json({ message: 'User does not exist' });

        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ message: 'Token not found' });

        const user = validateToken(authorization);
        if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

        return res.status(200).json(useId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal error' });
    }
}); */
  
  module.exports = {
    getUserController,
    getUserByIdControler,
  };
