// eslint-disable-next-line no-useless-escape
const regExUrl = /^(http(s)?:\/{2})((w{3}\.)?)([\w\-\._~:\/?#\[\]@!$&\'\(\)*\+,;=]+)$(#)?/im;

const allowedCorsUrl = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3002',
  'https://localhost:3002',
  'http://Mesto.Daria-N.nomoredomains.icu',
  'http://mesto.Daria-N.nomoredomains.icu',
  'https://Mesto.Daria-N.nomoredomains.icu',
  'http://127.0.0.1',
];

module.exports = { regExUrl, allowedCorsUrl };
