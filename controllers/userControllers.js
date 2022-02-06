const express = require('express');
const { generateToken } = require('../auth/tokenConfig');

const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
  try {
      const { displayName, email, password, image } = req.body;
      await User.create({ displayName, email, password, image });
      
      const geraTok = generateToken(email, password);
      
      return res.status(201).json({ token: geraTok });
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal error' });
  }
});

module.exports = router;
