/**
 * https://github.com/yatskevich/grunt-bower-task
 */
module.exports = {
  install: {
    options: {
      targetDir: './lib',
      layout: 'byComponent',
      install: true,
      verbose: false,
      cleanTargetDir: true,
      cleanBowerDir: true,
      bowerOptions: {
        forceLatest: true,
        production: true
      }
    }
  }
};
