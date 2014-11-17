/**
 * https://github.com/yatskevich/grunt-bower-task
 */
module.exports = {
  install: {
    options: {
      targetDir: './lib',
      layout: 'byComponent',
      install: true,
      verbose: true,
      cleanTargetDir: true,
      cleanBowerDir: false,
      bowerOptions: {
        forceLatest: true,
        production: true
      }
    }
  }
};
