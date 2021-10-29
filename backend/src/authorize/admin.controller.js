const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const wrap = require('../helpers/wrapper');
const httpCodes = require('../helpers/httpCodes');
const { ERR_MESSAGES, ADMIN_DEFAULT_PASSWORD, ADMIN_DEFAULT_USERNAME, ADMIN_SECRET_KEY } = require('../configs/commons.config');

const admin_authorize = async (username, password) => {

  return new Promise(async resolve => {

    if(!username || !password) {
      resolve(wrap(ERR_MESSAGES.DATA_INCOMPLETE, null, httpCodes.BAD_REQUEST))
      return;
    }
    
    if(username == ADMIN_DEFAULT_USERNAME && password == ADMIN_DEFAULT_PASSWORD){
      const token = jwt.sign({}, ADMIN_SECRET_KEY);
      resolve( wrap(null, token, httpCodes.OK) );
      return;
    }

    const whereQuery = { username: username, level: 'admin' };
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
      const adminData = resultQuery[0], hashedPassword = adminData.password;
      let passwordIsValid;
      try{
        passwordIsValid = bcrypt.compareSync(password, hashedPassword);
      }catch(err){
        resolve( wrap(err.message, null, httpCodes.BAD_REQUEST) );
        return;
      }
  
      if(passwordIsValid){
        const token = jwt.sign({}, ADMIN_SECRET_KEY);
        resolve( wrap(null, token, httpCodes.OK) );
        return;
      }else{
        resolve( wrap(ERR_MESSAGES.WRONG_PASSWORD, null, httpCodes.UNAUTHORIZED) );
        return;
      }
      
    }
  })
 
}

module.exports = admin_authorize;