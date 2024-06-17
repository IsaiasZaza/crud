const crypto = require('node:crypto');

const hashPassword = (password, salt) => new Promise((resolve, reject) => {
  crypto.scrypt(password, salt, 32, (err, derivedKey) => {
    if (err) {
      reject(err);
    } else {
      resolve(derivedKey.toString('hex'));
    }
  });
});

module.exports = {
  hashPassword,
};
