module.exports = {
  dist: {
    options: {
      paths: ['bower_components/lesshat'],
      cleancss: true
    },
    files: {
      'dist/less/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.less'
    }
  },
  src: {
    options: {
      paths: ['bower_components/lesshat'],
      cleancss: false,
      sourceMap: true,
      sourceMapFilename: '<%= config.dist.less %>/<%= pkg.name %>.less.map'
    },
    files: {
      'dist/css/<%= pkg.name %>.css': 'src/<%= pkg.name %>.less'
    }
  }
};