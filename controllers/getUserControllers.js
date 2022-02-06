const express = require('express');
const { User } = require('../models');

const router = express.Router();
const { validateToken } = require('../auth/tokenConfig');

router.get('/', async (req, res) => {
    try {
        const all = await User.findAll();
       
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ message: 'Token not found' });

        const user = validateToken(authorization);
        if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
        
        return res.status(200).json(all);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal arror' });
    }
  });
  
  module.exports = router;
