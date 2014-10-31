;
(function () {
  window.Diagram = window.Diagram || undefined;

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
;window.Diagram.DSL.Action = (function () {

  function Action(actorA) {
    this.actorA = actorA;
    this.actorB = undefined;
    this.lineStyle = Diagram.DSL.LineStyle.DEFAULT;
  }

  Action.prototype.lineTo = function (actorB) {
    this.actorB = actorB;
    return new Diagram.DSL.Command(this);
  };

  Action.prototype.dashTo = function (actorB) {
    this.actorB = actorB;
    this.lineStyle = Diagram.DSL.LineStyle.DASHED;
    return new Diagram.DSL.Command(this);
  };

  return Action;

})();
;window.Diagram.DSL.ArrowStyle = {
  DEFAULT: '>',
  OPEN: '>>'
};
;window.Diagram.DSL.Command = (function () {

  function Command(action) {
    this.action = action;
    this.label = undefined;
  }

  Command.prototype.withText = function (label) {
    this.label = label;
    return new Diagram.DSL.Sequence(this);
  };

  return Command;

})();
;window.Diagram.DSL.DiagramTheme = {
  DEFAULT: 'simple',
  HAND_DRAWN: 'hand'
};
;window.Diagram.DSL.LineStyle = {
  DEFAULT: '-',
  DASHED: '--'
};
;window.Diagram.DSL.Sequence = (function () {

  function Sequence(command) {
    this.command = command;
    this.arrowStyle = Diagram.DSL.ArrowStyle.DEFAULT;
  }

  Sequence.prototype.andOpenArrow = function () {
    this.arrowStyle = Diagram.DSL.ArrowStyle.OPEN;
    return this;
  };

  Sequence.prototype.toString = function () {
    return this.command.action.actorA +
      this.command.action.lineStyle +
      this.arrowStyle +
      this.command.action.actorB +
      ': ' +
      this.command.label;
  };

  return Sequence;

})();
;window.Diagram.DSL.SequenceDiagram = (function () {

  function SequenceDiagram(title, style) {
    this.title = title;
    this.sequences = [];
    this.style = Diagram.DSL.DiagramTheme.DEFAULT;
    this.element = undefined;

    if (style) {
      this.style = style;
    }
  }

  SequenceDiagram.prototype.render = function () {
    var output = '';

    if (this.title) {
      output += 'title: ' + this.title + '\n';
    }

    for (var i = 0; i < this.sequences.length; i++) {
      var sequence = this.sequences[i];
      output += sequence.toString() + '\n';
    }

    return output;
  };

  SequenceDiagram.prototype.renderTo = function (element) {
    this.element = element;
    var output = this.render();
    element.html(output);
    element.sequenceDiagram({theme: this.style});
  };

  SequenceDiagram.prototype.saveAsPng = function () {
    // Get dimension
    var svgElement = this.element.children(0).get(0);
    var svgWidth = svgElement.getBoundingClientRect().width;
    var svgHeight = svgElement.getBoundingClientRect().height;

    var width = Math.ceil(svgWidth);
    var height = Math.ceil(svgHeight);

    // Draw canvas
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'none';
    this.element.append(canvas);

    // Draw SVG on Canvas
    var outer = document.createElement('div');
    outer.appendChild(svgElement.cloneNode(true));
    var xml = outer.innerHTML;
    var unicodeXml = window.btoa(window.Diagram.DSL.unescape(encodeURIComponent(xml)));

    var self = this;

    var image = new Image();
    image.src = 'data:image/svg+xml;base64,' + unicodeXml;
    image.onload = function () {
      var context = canvas.getContext('2d');
      context.fillStyle = '#FFF';
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0);

      // Download PNG
      var anchor = document.createElement('a');
      if (self.title) {
        anchor.download = self.title + '.png';
      } else {
        anchor.download = 'sequence.png';
      }
      anchor.href = canvas.toDataURL('image/png');
      self.element.append(anchor);
      anchor.click();
    };
  };

  return SequenceDiagram;

})();
