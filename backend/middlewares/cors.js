const { allowedCorsUrl } = require('../utils/utils');

module.exports.allowedCors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCorsUrl.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
