const bcrypt = require("bcrypt");
const saltRounds = 10;
const pwdHasher = (pwd) => {
  return bcrypt.hash(pwd, saltRounds).then(async hash => hash);
};

const loginCheck = async (userPwd, hash) => {
  return bcrypt.compare(userPwd, hash).then(async res => res)  
};

module.exports = {
  pwdHasher,
  loginCheck,
};
