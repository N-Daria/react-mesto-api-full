const regExUrl = /^(http(s)?:\/{2})((w{3}\.)?)(([\w-]{1,})(\.))+([\w\-\/\.~:?#\[\]@!$&'\(\)*\+,;=]+)()?([\w])?$(#)?/im;

const allowedCorsUrl = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3002',
  'https://localhost:3000',
  'http://Mesto.Daria-N.nomoredomains.icu',
  'https://Mesto.Daria-N.nomoredomains.icu',
  'https://mesto.daria-n.nomoredomains.icu',
  'http://mesto.daria-n.nomoredomains.icu',
  'http://127.0.0.1',
  'http://localhost:3000',
];

module.exports = { regExUrl, allowedCorsUrl };
