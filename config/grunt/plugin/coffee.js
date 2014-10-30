module.exports = {
  dist: {
    expand: true,
    flatten: true,
    cwd: '<%= config.src.coffee %>',
    dest: '<%= config.dist.js %>',
    src: ['*.coffee'],
    ext: '.js',
    options: {
      sourceMap: true
    }
  }
};