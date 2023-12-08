const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');
module.exports = (err, req, res, next) => {
  console.log('err.message --->>> ', err.message);
  console.log('err.status --->>> ', err.status);
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.status = 406;
  }
  if (err instanceof TokenExpiredError) {
    return res.status(408).send('Token Expired');
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(401).send('JsonWebToken wrong!');
  }
  if (!err.message || !err.status) {
    return res.status(500).send('Server Error');
  }
  return res.status(err.status).send(err.message);
};
