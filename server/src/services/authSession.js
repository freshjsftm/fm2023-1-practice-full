const { createTokenPair } = require('../services/jwtServices');
const { MAX_DEVICES_AMOUNT } = require('../constants');

module.exports.createSession = async (user, options = {}) => {
  try {
    const tokenPair = await createTokenPair(user);
    if ((await user.countRefreshTokens()) >= MAX_DEVICES_AMOUNT) {
      const [oldestToken] = await user.getRefreshTokens({
        order: [['updatedAt', 'ASC']],
      });
      await oldestToken.update({ ...options, value: tokenPair.refresh });
    } else {
      await user.createRefreshToken({ ...options, value: tokenPair.refresh });
    }
    user.password = undefined;
    return { user, tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.refreshSession = async (refreshToken) => {
  try {
    const user = await refreshToken.getUser();
    const tokenPair = await createTokenPair(user);
    await refreshToken.update({ value: tokenPair.refresh });
    user.password = undefined;
    return { user, tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};