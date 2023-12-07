const createHTTPError = require('http-errors');
const { User } = require('../models');
const { createTokenPair } = require('../services/jwtServices');

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    // create user
    const user = await User.create(body);
    // create tokenPair
    const tokenPair = await createTokenPair(user);
    // send user with tokenPair
  } catch (error) {
    next(error);
  }
};

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await user.comparePassword(password))) {
      const tokenPair = await createTokenPair(user);
      //save refreshToken
      //create userWithToken
      return res.status().send({data: userWithToken});
    }
    next(createHTTPError(401, 'Unautorized!'));
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
    // req -> tokenRefresh
    // find tokenRefresh
    // create tokenPair
    const tokenPair = await createTokenPair(user);
    // send user with tokenPair
  } catch (error) {
    next(error);
  }
};
