const jwt = require('jsonwebtoken');
const {ADMIN_SECRET_KEY, PETUGAS_SECRET_KEY, SISWA_SECRET_KEY, ERR_MESSAGES} = require('../configs/commons.config');
const httpCodes = require('../helpers/httpCodes');
const wrap = require('../helpers/wrapper');

module.exports = {
  admin_authenticate : (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; //using bearer token
    
    const jwtIsValid = jwt.verify(token, ADMIN_SECRET_KEY);

    if(jwtIsValid) next();
    else res.status(httpCodes.UNAUTHORIZED).json(wrap(ERR_MESSAGES.UNAOTHORIZED, null, httpCodes.UNAUTHORIZED));
  },

  petugas_authenticate : (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; //using bearer token
    
    const jwtIsValid = jwt.verify(token, PETUGAS_SECRET_KEY);

    if(jwtIsValid) next();
    else res.status(httpCodes.UNAUTHORIZED).json(wrap(ERR_MESSAGES.UNAOTHORIZED, null, httpCodes.UNAUTHORIZED));
  },

  siswa_authenticate : (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; //using bearer token
    
    const jwtIsValid = jwt.verify(token, SISWA_SECRET_KEY);

    if(jwtIsValid) next();
    else res.status(httpCodes.UNAUTHORIZED).json(wrap(ERR_MESSAGES.UNAOTHORIZED, null, httpCodes.UNAUTHORIZED));
  }
}