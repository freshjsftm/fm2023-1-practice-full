const { User } = require('../models');

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    // create user
    const user = await User.create(body);
    // create tokenPair
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

    // find user at email
    const user = await User.findOne({
      where: { email },
    });
    // compare password
    // create tokenPair
    // send user with tokenPair
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
    // req -> tokenRefresh
    // find tokenRefresh
    // create tokenPair
    // send user with tokenPair
  } catch (error) {
    next(error);
  }
};
