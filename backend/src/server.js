const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const crudRouter = require('./crud/crud.router');
const authorizeHandler = require('./authorize/authorize.handler');
const helpers = require('./server.helpers');


const { PORT, ENDPOINTS } = require('./configs/server.config');

app.use( ENDPOINTS.CRUD_ENDPOINT , helpers.passwordHasher, crudRouter);
app.post( ENDPOINTS.AUTHORIZE_ENDPOINT, authorizeHandler);

app.listen(PORT, () => {
  console.log('server is running at port: ' + PORT)
})