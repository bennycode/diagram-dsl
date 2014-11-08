/**
 * Read more:
 * https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md
 */
module.exports = {
  demo: {
    options: {
      livereload: '<%= server.port.livereload %>'
    },
    files: [
      '<%= config.demo.root %>/**/*.html',
      '<%= config.src.root %>/**/*.{js,less}'
    ]
  }
};
