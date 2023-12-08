const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');

authRouter.post(
  '/sign-up',
  validators.validateRegistrationData,
  AuthController.signUp
);
authRouter.post('/sign-in', validators.validateLogin, AuthController.signIn);
authRouter.post('/refresh', checkRefreshToken,  AuthController.refresh);

module.exports = authRouter;
