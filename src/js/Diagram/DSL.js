;
(function () {
  window.Diagram = Diagram;

  if (typeof window.Diagram === "undefined") {

    console.warn('Cannot find "window.Diagram" library. Did you forgot to include it?');
    console.warn('You can get it here: https://github.com/bramp/js-sequence-diagrams/');

  } else {

    window.Diagram.DSL = window.Diagram.DSL || {};
    window.Diagram.DSL.from = function from(actorA) {
      return new Diagram.DSL.Action(actorA);
    }

    /**
     * Polyfill for "window.unescape"-
     * Read more: http://cwestblog.com/2011/05/23/escape-unescape-deprecated/
     * @param {string} input
     * @returns {*}
     */
    window.Diagram.DSL.escapeHash = function (input) {
      var ret = window.Diagram.DSL.escapeHash[input];
      if (!ret) {
        if (input.length - 1) {
          ret = String.fromCharCode(input.substring(input.length - 3 ? 2 : 1));
        }
        else {
          var code = input.charCodeAt(0);
          ret = code < 256
            ? "%" + (0 + code.toString(16)).slice(-2).toUpperCase()
            : "%u" + ("000" + code.toString(16)).slice(-4).toUpperCase();
        }
        window.Diagram.DSL.escapeHash[ret] = input;
        window.Diagram.DSL.escapeHash[input] = ret;
      }
      return ret;
    };

    window.Diagram.DSL.unescape = window.unescape || function (str) {
      return str.replace(/%(u[\da-f]{4}|[\da-f]{2})/gi, function (seq) {
        return window.Diagram.DSL.escapeHash._(seq);
      });
    };

  }
})();
