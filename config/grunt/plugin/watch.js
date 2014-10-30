module.exports = {
  coffee: {
    options: {
      livereload: '<%= config.livereload.port %>'
    },
    files: '<%= config.src.coffee %>/**/*.coffee',
    tasks: ['coffee:dist']
  }
};