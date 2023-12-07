const createHTTPError = require('http-errors');
const { User, RefreshToken } = require('../models');
const { createSession, refreshSession } = require('../services/authSession');

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await createSession(user);
      return res.status(201).send({ data });
    }
    next(createHTTPError(400, 'Bad request'));
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
      const data = await createSession(user);
      return res.status(200).send({ data });
    }
    next(createHTTPError(401, 'Unautorized!'));
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const instanceRefreshToken = await RefreshToken.findOne({
      where: {
        value: refreshToken,
      },
    });
    if (instanceRefreshToken) {
      const data = await refreshSession(instanceRefreshToken);
      return res.status(200).send({ data });
    }
    next(createHTTPError(400, 'Bad request'));
  } catch (error) {
    next(error);
  }
};
