/**
 * https://github.com/gruntjs/grunt-contrib-connect/
 */
module.exports = {
  server: {
    options: {
      base: '.',
      hostname: '*',
      port: '<%= server.port.connect %>'
    }
  }
};
