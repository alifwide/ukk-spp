const app = require('express')();
const crudController = require('./crud.controller');
const helpers = require('./crud.helpers')

app.get('/:table', helpers.validateTable , async (req, res) => {
  const { table } = req.params;
  const queryResult = await crudController.read(table, {});
  const { code } = queryResult;

  res.status(code).json(queryResult);
});

app.get('/:table/:identifierKey/:identifier', helpers.validateTable , async (req, res) => {
  const { table, identifierKey, identifier } = req.params;
  const whereQuery = {}; whereQuery[identifierKey] = identifier;
  const queryResult = await crudController.read(table, whereQuery);
  const { code } = queryResult;

  res.status(code).json(queryResult);
});

app.post('/:table', helpers.validateTable , async (req, res) => {
  const { table } = req.params;
  const payload = req.body;
  const queryResult = await crudController.create(table,payload);
  const { code } = queryResult;

  res.status(code).json(queryResult);
});

app.put('/:table/:identifierKey/:identifier', helpers.validateTable , async (req, res) => {
  const { table, identifierKey, identifier } = req.params;
  const whereQuery = {}; whereQuery[identifierKey] = identifier;
  const payload = req.body;
  const queryResult = await crudController.update(table, payload, whereQuery);
  const { code } = queryResult;

  res.status(code).json(queryResult);
});

app.delete('/:table/:identifierKey/:identifier', helpers.validateTable , async (req, res) => {
  const { table, identifierKey, identifier } = req.params;
  const whereQuery = {}; whereQuery[identifierKey] = identifier;
  const queryResult = await crudController.del(table,whereQuery);
  const { code } = queryResult;

  res.status(code).json(queryResult);
});

module.exports = app;