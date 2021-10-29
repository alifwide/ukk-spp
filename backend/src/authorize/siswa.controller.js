const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const wrap = require('../helpers/wrapper');
const httpCodes = require('../helpers/httpCodes');
const { ERR_MESSAGES, SISWA_SECRET_KEY } = require('../configs/commons.config');

const siswa_authorize = async (email, password) => {

  return new Promise(async resolve => {

    if(!email || !password) {
      resolve(wrap(ERR_MESSAGES.DATA_INCOMPLETE, null, httpCodes.BAD_REQUEST))
      return;
    }

    const whereQuery = { email: email };
    let resultQuery;
    
    try{
      resultQuery = await db.siswa.findAll({ where: whereQuery, raw: true });
    }catch(err){
      resolve( wrap(err.message, null, httpCodes.BAD_REQUEST) );
      return;
    }
  
    if(resultQuery.length == 0){
      resolve( wrap(ERR_MESSAGES.INVALID_EMAIL(email), null, httpCodes.BAD_REQUEST ));
      return;
    }else{
  
      const siswaData = resultQuery[0], hashedPassword = siswaData.password;
      let passwordIsValid;
      try{
        passwordIsValid = bcrypt.compareSync(password, hashedPassword);
      }catch(err){
        resolve( wrap(err.message, null, httpCodes.BAD_REQUEST) );
        return;
      }
  
      if(passwordIsValid){
        const token = jwt.sign({}, SISWA_SECRET_KEY);
        resolve( wrap(null, token, httpCodes.OK) );
        return;
      }else{
        resolve( wrap(ERR_MESSAGES.WRONG_PASSWORD, null, httpCodes.UNAUTHORIZED) );
        return;
      }
      
    }
  })
}

module.exports = siswa_authorize;