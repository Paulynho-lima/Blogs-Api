const Joi = require('joi');
const { User, Category } = require('../models');

const CODE_ERR = 400;

const validUsers = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
});

const dispNameValid = (req, res, next) => {
    const { displayName } = req.body;
   
    if (displayName.length < 8) {
   return res.status(CODE_ERR)
      .json({ message: '"displayName" length must be at least 8 characters long' }); 
  }
    next();
   };

// Reference de findOne() em https://sequelize.org/master/manual/model-querying-finders.html#-code-findall--code-
// Reference de regex em https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const emailValid = async (req, res, next) => {
    const { email } = req.body;

    const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!email) {
        return res.status(CODE_ERR).json({ message: '"email" is required' });
      }

    if (!reg.test(email)) {
        return res.status(CODE_ERR)
      .json({ message: '"email" must be a valid email' }); 
    }
    const resul = await User.findOne({ where: { email } });
   // console.log(resul);
        
    if (resul) {
        return res.status(409)
      .json({ message: 'User already registered' }); 
    } 
    
      next();
   };

const passwordValid = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(CODE_ERR).json({ message: '"password" is required' });
    } if (password.length < 6 || password.length > 6) {
   return res.status(CODE_ERR)
      .json({ message: '"password" length must be 6 characters long' }); 
  }
    next();
   };

   const loginEmailValid = async (req, res, next) => {
    const { email } = req.body;
    const { error } = validUsers.validate({ email });
     if (error) {
 return res.status(CODE_ERR).json({ message: '"email" is not allowed to be empty' }); 
     }
     
     if (!email) {
      return res.status(CODE_ERR).json({ message: '"email" is required' });
     } 
  const users = await User.findOne({ where: { email } });
if (!users) return res.status(CODE_ERR).json({ message: 'Invalid fields' }); 
  next();
   };

   const loginPasswordValid = async (req, res, next) => {
    const { password, email } = req.body;
    const { error } = validUsers.validate({ password });
     if (error) {
      return res.status(CODE_ERR).json({ message: '"password" is not allowed to be empty' }); 
     } 
     
    if (!password) {
      return res.status(CODE_ERR).json({ message: '"password" is required' });
    } 
    const users = await User.findOne({ where: { email } });
    if (!users) return res.status(CODE_ERR).json({ message: 'Invalid fields' }); 
  next();
   };

const nameValidCategory = (req, res, next) => {
  const { name } = req.body;
 
  if (!name) {
 return res.status(CODE_ERR)
    .json({ message: '"name" is required' }); 
}
  next();
 };

 const blogPostValid = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
   
  if (!title) return res.status(CODE_ERR).json({ message: '"title" is required' });
  
  if (!content) return res.status(CODE_ERR).json({ message: '"content" is required' });

  if (!categoryIds) return res.status(CODE_ERR).json({ message: '"categoryIds" is required' });
  const idCat = await Category.findOne({ where: { id: categoryIds } });
  
  if (!idCat) {
    return res.status(CODE_ERR).json({ message: '"categoryIds" not found' });
  }
  next();
 };

 const updateBlogPostValid = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
   
  if (!title) return res.status(CODE_ERR).json({ message: '"title" is required' });
  
  if (!content) return res.status(CODE_ERR).json({ message: '"content" is required' });
  
  if (categoryIds) {
    return res.status(CODE_ERR).json({ message: 'Categories cannot be edited' });
  } 
  next();
 };

module.exports = {
       dispNameValid,
       emailValid,
       passwordValid,
       loginEmailValid,
       loginPasswordValid,
       nameValidCategory,
       blogPostValid,
       updateBlogPostValid,
       
   };