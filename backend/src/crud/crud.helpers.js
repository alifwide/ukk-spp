const { TABLES } = require('../configs/commons.config');
const wrap = require('../helpers/wrapper');
const httpCodes = require('../helpers/httpCodes');
const { ERR_MESSAGES } = require('../configs/commons.config')

module.exports = {
  validateTable : (req, res, next) => {
    const table = req.params.table;
    for(const tableName of Object.keys(TABLES)){
      if(table === TABLES[tableName]){
        next();
        return;
      }
    }
    res.status(httpCodes.BAD_REQUEST).send(wrap(ERR_MESSAGES.INVALID_TABLE(table), null, httpCodes.BAD_REQUEST));
  }
}