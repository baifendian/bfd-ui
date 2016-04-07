var babelJest = require('babel-jest');

module.exports = {
  process: function(src, filename) {
    return babelJest.process(src.replace(/import.*\.less.*/gi, ''), filename);
  }
};