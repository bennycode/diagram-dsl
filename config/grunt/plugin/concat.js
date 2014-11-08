module.exports = {
  options: {
    separator: ';'
  },
  js: {
    src: ['<%= path.src.js %>/**/*.js'],
    dest: '<%= path.dist.js %>/<%= pkg.name %>.js'
  },
  less: {
    src: ['<%= path.src.less %>/**/*.less'],
    dest: '<%= path.dist.less %>/<%= pkg.name %>.less'
  }
};
