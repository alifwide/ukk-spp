const bcrypt = require('bcrypt');

module.exports = {
  passwordHasher: (req,res,next) => {
    if(req.body && req.body.password){
      const plainPass = req.body.password;
      const hashedPass = bcrypt.hashSync(plainPass, 10);
      req.body.password = hashedPass;
    }
    next();
  }
}