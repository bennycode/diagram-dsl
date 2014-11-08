module.exports = {
  dist: {
    expand: true,
    flatten: true,
    cwd: '<%= path.src.coffee %>',
    dest: '<%= path.dist.js %>',
    src: ['*.coffee'],
    ext: '.js',
    options: {
      sourceMap: true
    }
  }
};
