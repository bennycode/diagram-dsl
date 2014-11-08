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
      '<%= path.demo.root %>/**/*.html',
      '<%= path.src.root %>/**/*.{js,less}'
    ]
  }
};
