const express = require('express');
const userControllers = require('./controllers/userControllers');
const categoriesControllers = require('./controllers/categoriesControllers');
const blogPostControllers = require('./controllers/blogPostControllers');
 const { getUserController, getUserByIdControler } = require('./controllers/getUserControllers');
const errorAuth = require('./middlewares/errorAuth');

const loginControllers = require('./controllers/loginControllers');
const { emailValid, dispNameValid, passwordValid, loginEmailValid,
   loginPasswordValid, nameValidCategory, blogPostValid } = require('./middlewares/validations');
const { getCategoryController } = require('./controllers/getCategoriesContr');
const { getBlogPostControllers,
 getBlogPostByIdControl } = require('./controllers/getBlogPostControllers');

const app = express();
const PORT = process.env.PORT || 3000;
  
app.use(express.json());

app.get('/user', errorAuth, getUserController);
app.get('/user/:id', errorAuth, getUserByIdControler);

app.use('/user/', dispNameValid, emailValid, passwordValid, userControllers);
app.use('/login/', loginEmailValid, loginPasswordValid, loginControllers);

app.get('/categories', errorAuth, getCategoryController);
app.use('/categories/', errorAuth, nameValidCategory, categoriesControllers);

app.get('/post', errorAuth, getBlogPostControllers);
app.get('/post/:id', errorAuth, getBlogPostByIdControl);
app.use('/post/', errorAuth, blogPostValid, blogPostControllers);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
