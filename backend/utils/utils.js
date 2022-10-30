// eslint-disable-next-line no-useless-escape
const regExUrl = /^(http(s)?:\/{2})((w{3}\.)?)([\w\-\._~:\/?#\[\]@!$&\'\(\)*\+,;=]+)$(#)?/im;

const allowedCorsUrl = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://Mesto.Daria-N.nomoredomains.icu',
  'https://Mesto.Daria-N.nomoredomains.icu',
];

module.exports = { regExUrl, allowedCorsUrl };
