const regExUrl = /^(http(s)?:\/{2})((w{3}\.)?)(([\w-]{1,})(\.))+([\w\-\/\.~:?#\[\]@!$&'\(\)*\+,;=]+)()?([\w])?$(#)?/im;

const allowedCorsUrl = [
  'http://mesto.daria.nomoredomainsclub.ru',
  'https://mesto.daria.nomoredomainsclub.ru',
  'http://localhost:3000',
];

module.exports = { regExUrl, allowedCorsUrl };
