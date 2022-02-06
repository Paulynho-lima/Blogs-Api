const express = require('express');
const userControllers = require('./controllers/userControllers');
const getUserControllers = require('./controllers/getUserControllers');

const loginControllers = require('./controllers/loginControllers');
const { emailValid, dispNameValid, passwordValid, loginEmailValid,
   loginPasswordValid } = require('./middlewares/validations');

const app = express();
const PORT = process.env.PORT || 3000;
  
app.use(express.json());

app.use('/user', getUserControllers);
app.use('/user', dispNameValid, emailValid, passwordValid, userControllers);
app.use('/login', loginEmailValid, loginPasswordValid, loginControllers);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
