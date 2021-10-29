const httpCodes = require("../helpers/httpCodes");
const wrap = require('../helpers/wrapper');
const admin_authorize = require('./admin.controller');
const petugas_authorize = require('./petugas.controller');
const siswa_authorize = require('./siswa.controller');


module.exports = async (req, res) => {

  const level = req.params.level;
  if(level == 'admin'){

    const password = req.body.password;
    const username = req.body.username;

    const result = await admin_authorize(username, password);
    res.status(result.code).json(result);

  }else if(level == 'petugas'){

    const password = req.body.password;
    const username = req.body.username;

    const result = await petugas_authorize(username, password);
    res.status(result.code).json(result);

  }else if(level == 'siswa'){

    const password = req.body.password;
    const email = req.body.email;

    const result = await siswa_authorize(email, password);
    res.status(result.code).json(result);

  }

}