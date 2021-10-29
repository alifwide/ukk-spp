module.exports =  wrap = (err, data, code) => {
  return ({
    err: err,
    data: data,
    code: code
  })
}