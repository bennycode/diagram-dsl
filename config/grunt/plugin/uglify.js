module.exports = {
  options: {
    banner: '// ┌─────────────────────────────────────────┐ \\'+ '\n' +
            '// │ Domain-specific language for JavaScript sequence diagrams         │ \\'+ '\n' +
            '// ├─────────────────────────────────────────┤ \\'+ '\n' +
            '// │ Copyright © <%= grunt.template.today("yyyy") %> Benny Neugebauer (http://welovecoding.com)       │ \\'+ '\n'+
            '// └─────────────────────────────────────────┘ \\'
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