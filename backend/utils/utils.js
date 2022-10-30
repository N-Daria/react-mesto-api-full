// eslint-disable-next-line no-useless-escape
const regExUrl = /^(http(s)?:\/{2})((w{3}\.)?)([\w\-\._~:\/?#\[\]@!$&\'\(\)*\+,;=]+)$(#)?/im;

const allowedCorsUrl = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

module.exports = { regExUrl, allowedCorsUrl };
