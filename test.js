// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');
const { Md5 } = require('md5-typescript');

function secretKeys() {
  const key1 = crypto.randomBytes(32).toString('hex');
  const key2 = crypto.randomBytes(32).toString('hex');
  console.table({ key1, key2 });
}

function hashPassword(password) {
  const hashed = Md5.init(password);
  console.log({ hashed });
}

hashPassword('1');
