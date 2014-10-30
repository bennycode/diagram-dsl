module.exports = {
  dist: {
    src: '<%= config.dist.js %>/**/*.js'
  },
  options: {
    specs: '<%= config.test.spec %>/*Spec.js',
    helpers: '<%= config.test.spec %>/*Helper.js'
  }
};