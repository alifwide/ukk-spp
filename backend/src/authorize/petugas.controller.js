const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const wrap = require('../helpers/wrapper');
const httpCodes = require('../helpers/httpCodes');
const { ERR_MESSAGES, PETUGAS_SECRET_KEY } = require('../configs/commons.config');

const petugas_authorize = async (username, password) => {

  return new Promise(async resolve => {

    if(!username || !password) {
      resolve(wrap(ERR_MESSAGES.DATA_INCOMPLETE, null, httpCodes.BAD_REQUEST))
      return;
    }
    
    const whereQuery = { username: username, level: 'petugas' };
    let resultQuery;
    try{
      resultQuery = await db.petugas.findAll({ where: whereQuery, raw: true });
    }catch(err){
      resolve( wrap(err.message, null, httpCodes.BAD_REQUEST) );
      return;
    }
  
    if(resultQuery.length == 0){
      resolve( wrap(ERR_MESSAGES.INVALID_USERNAME(username), null, httpCodes.BAD_REQUEST) );
      return;
    }else{
  
      const petugasData = resultQuery[0], hashedPassword = petugasData.password;
      let passwordIsValid;
      try{
        passwordIsValid = bcrypt.compareSync(password, hashedPassword);
      }catch(err){
        resolve( wrap(err.message, null, httpCodes.BAD_REQUEST) );
        return;
      }
  
      if(passwordIsValid){
        const token = jwt.sign({}, PETUGAS_SECRET_KEY);
        resolve( wrap(null, token, httpCodes.OK) );
        return;
      }else{
        resolve( wrap(ERR_MESSAGES.WRONG_PASSWORD, null, httpCodes.UNAUTHORIZED) );
        return;
      }
      
    }

  })


}

module.exports = petugas_authorize;