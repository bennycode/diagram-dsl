module.exports = {
  server: {
    options: {
      base: '<%= config.demo.root %>',
      hostname: '*',
      port: '<%= server.port.connect %>'
    }
  }
};
