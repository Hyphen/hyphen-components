const crypto = require('crypto');
const path = require('path');

const normalizePath = (value) => value.split(path.sep).join('/');

const hash = (value) =>
  crypto
    .createHash('md5')
    .update(value)
    .digest('base64')
    .replace(/[+/=]/g, '')
    .substring(0, 5);

const generateScopedName = (localName, resourcePath) => {
  const relativePath = normalizePath(path.relative(process.cwd(), resourcePath));
  return `${localName}__${hash(`${relativePath}:${localName}`)}`;
};

module.exports = {
  generateScopedName,
};
