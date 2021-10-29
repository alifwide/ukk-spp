const model = require('../models/index');
const wrap = require('../helpers/wrapper');
const httpCodes = require('../helpers/httpCodes');

const create = async (table, payload) => {
  const db = model[table];
  return new Promise( async (resolve) => {
    try{
      const queryResult = await db.create(payload, {raw: true});
      resolve(wrap(null, queryResult.get({plain: true}), httpCodes.OK));
    }catch(err){  
      resolve(wrap(err.message, null, httpCodes.BAD_REQUEST));
    }
  })
}

const read = async (table, where) => {
  const db = model[table];
  return new Promise( async (resolve) => {
    try{
      const queryResult = await db.findAll({where: where, raw: true});
      resolve(wrap(null, queryResult, httpCodes.OK));
    }catch(err){  
      resolve(wrap(err.message, null, httpCodes.BAD_REQUEST));
    }
  })
}

const update = async (table, payload, where) => {
  const db = model[table];
  return new Promise( async (resolve) => {
    try{
      const queryResult = await db.update(payload, {where: where, raw: true});
      resolve(wrap(null, queryResult, httpCodes.OK));
    }catch(err){  
      resolve(wrap(err.message, null, httpCodes.BAD_REQUEST));
    }
  })
}

const del = async (table, where) => {
  const db = model[table];
  return new Promise( async (resolve) => {
    try{
      const queryResult = await db.destroy({where: where, raw: true});
      resolve(wrap(null, queryResult, httpCodes.OK));
    }catch(err){  
      resolve(wrap(err.message, null, httpCodes.BAD_REQUEST));
    }
  })
}

module.exports = {
  create,
  read,
  update,
  del
}