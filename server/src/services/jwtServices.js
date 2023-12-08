const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const {
  ACCESS_JWT_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_JWT_SECRET,
  REFRESH_TOKEN_TIME,
} = require('../constants');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const createToken = (payload, { secret, time }) => {
  return signJWT(
    {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secret,
    { expiresIn: time }
  );
};

module.exports.createTokenPair = async payload => ({
  access: await createToken(payload, {
    secret: ACCESS_JWT_SECRET,
    time: ACCESS_TOKEN_TIME,
  }),
  refresh: await createToken(payload, {
    secret: REFRESH_JWT_SECRET,
    time: REFRESH_TOKEN_TIME,
  }),
});

module.exports.verifyAccessToken = token => verifyJWT(token, ACCESS_JWT_SECRET);
module.exports.verifyRefreshToken = token =>
  verifyJWT(token, REFRESH_JWT_SECRET);
