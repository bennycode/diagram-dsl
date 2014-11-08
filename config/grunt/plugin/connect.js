module.exports = {
  server: {
    options: {
      base: '.',
      hostname: '*',
      port: '<%= server.port.connect %>'
    }
  }
};
