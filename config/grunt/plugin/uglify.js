module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */' + '\n'
  },
  dist: {
    options: {
      sourceMap: true
    },
    files: {
      'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
    }
  }
};
