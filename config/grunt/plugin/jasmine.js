module.exports = {
  dist: {
    src: '<%= path.dist.js %>/**/*.js'
  },
  options: {
    specs: '<%= path.test.spec %>/*Spec.js',
    helpers: '<%= path.test.spec %>/*Helper.js'
  }
};
