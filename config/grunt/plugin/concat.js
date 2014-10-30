module.exports = {
  options: {
    separator: ';'
  },
  js: {
    src: ['<%= config.src.js %>/**/*.js'],
    dest: '<%= config.dist.js %>/<%= pkg.name %>.js'
  },
  less: {
    src: ['<%= config.src.less %>/**/*.less'],
    dest: '<%= config.dist.less %>/<%= pkg.name %>.less'
  }
};