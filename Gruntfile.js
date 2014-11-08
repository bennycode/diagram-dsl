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
        demo: {
          root: 'demo'
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
        }
      },
      plugin: {
        clean: require('./config/grunt/plugin/clean'),
        coffee: require('./config/grunt/plugin/coffee'),
        concat: require('./config/grunt/plugin/concat'),
        connect: require('./config/grunt/plugin/connect'),
        jasmine: require('./config/grunt/plugin/jasmine'),
        less: require('./config/grunt/plugin/less'),
        open: require('./config/grunt/plugin/open'),
        uglify: require('./config/grunt/plugin/uglify'),
        watch: require('./config/grunt/plugin/watch')
      }
    },
    server: {
      port: {
        connect: 8888,
        livereload: 36963
      }
    }
  };

  grunt.initConfig({
    clean: config.grunt.plugin.clean,
    coffee: config.grunt.plugin.coffee,
    concat: config.grunt.plugin.concat,
    connect: config.grunt.plugin.connect,
    jasmine: config.grunt.plugin.jasmine,
    less: config.grunt.plugin.less,
    open: config.grunt.plugin.open,
    path: config.grunt.path,
    pkg: grunt.file.readJSON('package.json'),
    server: config.server,
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
  grunt.registerTask('default', ['connect', 'open:demo', 'watch:demo']);
};
