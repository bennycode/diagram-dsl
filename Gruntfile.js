module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    grunt: {
      path: {
        src: {
          root: 'src',
          coffee: 'src/coffee',
          js: 'src/js',
          less: 'src/less'
        },
        dist: {
          root: 'dist',
          js: 'dist/js',
          css: 'dist/css',
          less: 'dist/less'
        },
        test: {
          root: 'test',
          spec: 'test/spec'
        },
        livereload: {
          port: '8888'
        }
      },
      plugin: {
        clean: require('./config/grunt/plugin/clean'),
        coffee: require('./config/grunt/plugin/coffee'),
        concat: require('./config/grunt/plugin/concat'),
        jasmine: require('./config/grunt/plugin/jasmine'),
        less: require('./config/grunt/plugin/less'),
        uglify: require('./config/grunt/plugin/uglify'),
        watch: require('./config/grunt/plugin/watch')
      }
    }
  };

  grunt.initConfig({
    clean: config.grunt.plugin.clean,
    coffee: config.grunt.plugin.coffee,
    config: config.grunt.path,
    concat: config.grunt.plugin.concat,
    jasmine: config.grunt.plugin.jasmine,
    less: config.grunt.plugin.less,
    pkg: grunt.file.readJSON('package.json'),
    uglify: config.grunt.plugin.uglify,
    watch: config.grunt.plugin.watch
  });

  /* Build */
  grunt.registerTask('module-build-all', ['clean', 'concat', 'less:src']);
  grunt.registerTask('module-build-js', ['clean', 'concat:js']);

  /* Minifaction */
  grunt.registerTask('module-minify-all', ['module-build-all', 'uglify', 'less:dist']);

  /* Distribution */
  grunt.registerTask('module-dist-coffee', ['clean', 'coffee:dist']);
  grunt.registerTask('module-dist-js', ['module-build-js', 'uglify']);
  grunt.registerTask('module-dist-all', ['module-dist-js']);

  /* Test */
  grunt.registerTask('module-test-coffee', ['module-dist-coffee', 'jasmine:dist']);
  grunt.registerTask('module-test-js', ['module-build-js', 'jasmine:dist']);

  /* Main goals */
  grunt.registerTask('module-run', ['clean', 'watch']);

  /* Default goal */
  grunt.registerTask('default', ['module-run']);
};