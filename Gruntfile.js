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
    // Requirements
    bower: require('./config/grunt/plugin/bower'),
    clean: require('./config/grunt/plugin/clean'),
    coffee: require('./config/grunt/plugin/coffee'),
    concat: require('./config/grunt/plugin/concat'),
    connect: require('./config/grunt/plugin/connect'),
    jasmine: require('./config/grunt/plugin/jasmine'),
    less: require('./config/grunt/plugin/less'),
    open: require('./config/grunt/plugin/open'),
    uglify: require('./config/grunt/plugin/uglify'),
    watch: require('./config/grunt/plugin/watch'),
    // Configs
    path: config.grunt.path,
    pkg: grunt.file.readJSON('package.json'),
    server: config.server
  });

  /* Self Test */
  grunt.registerTask('module-self-test-grunt', function () {
    var pkg = grunt.file.readJSON('package.json');
    return grunt.log.writeln("Grunt works. Module: " + pkg.name);
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

  /* Execution */
  grunt.registerTask('module-run', ['connect', 'open:demo', 'watch:demo']);
  grunt.registerTask('module-first-run', ['module-self-test-grunt', 'bower:install', 'module-run']);

  /* Default */
  grunt.registerTask('default', 'module-run');
};
