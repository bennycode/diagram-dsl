if (window.location.hostname === 'localhost') {
  var livereload = document.createElement('script');
  livereload.id = 'livereload';
  livereload.src = '//localhost:36963/livereload.js';
  document.body.appendChild(livereload);
  console.info('Live Reload enabled: https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md');
}
