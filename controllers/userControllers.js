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
/*
const Sequelize = require('sequelize');
// const { Addresses, Employees } = require('./models');
const config = require('../config/config');

// const app = express();
// app.use(bodyParser.json());

const sequelize = new Sequelize(config.development);

router.post('/', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { displayName, email, password, image, title, content, published, updated } = req.body;

    const user = await User.create(
      { displayName, email, password, image }, { transaction: t },
    );

    console.log(user.id);

   const blog = await BlogPost.create(
      { title, content, published, updated, userId: user.id }, { transaction: t },
    );
      const geraTok = generateToken(email, password);

      if (router.post('/post')) return res.status(201).json(blog);
      if (router.post('/user')) return res.status(201).json({ token: geraTok });
  } catch (e) {
   await t.rollback();
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router; */