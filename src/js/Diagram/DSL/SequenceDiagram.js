Diagram.DSL.SequenceDiagram = (function () {

  /**
   * Combines the title, draw-style (theme) and all sequences (paths).
   *
   * @param {string} title The title which will be rendered above the diagram.
   * @param {Diagram.DSL.Theme} theme Theme which will be used to render the diagram.
   * @constructor
   */
  function SequenceDiagram(title, theme) {
    this.title = title;
    this.sequences = [];
    this.theme = Diagram.DSL.Theme.DEFAULT;
    this.element = undefined;

    if (theme) {
      this.theme = theme;
    }
  }

  /**
   * Add a sequence to an existing and already rendered diagram.
   * Should be done from "Diagram.DSL.Sequence.on".
   *
   * @param {Diagram.DSL.Sequence} sequence
   * @returns {Diagram.DSL.SequenceDiagram}
   */
  SequenceDiagram.prototype.addSequence = function (sequence) {
    this.sequences.push(sequence);
    this.renderTo();

    return this;
  };

  /**
   * Combines the title of the diagram (if any) and all sequences (paths)
   * into an output format which can be rendered.
   *
   * @returns {string} Output which can be rendered.
   */
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

  /**
   * Provides support to render a diagram from a declaration inside
   * an HTML element. Using an inline declaration, you can render all possible statements
   * from "js-sequence-diagrams".
   *
   * @param {HTMLElement} element Plain HTML element with diagram description.
   * @returns {Diagram.DSL.SequenceDiagram}
   *
   * @see {@link http://bramp.github.io/js-sequence-diagrams/|Possible statements}
   */
  SequenceDiagram.prototype.renderFrom = function (element) {
    if (element) {
      this.element = element;
    }

    var output = element.textContent || element.innerText;
    element.innerText = '';

    var parsedOutput = Diagram.parse(output);
    parsedOutput.drawSVG(this.element, {theme: this.theme});

    return this;
  };

  /**
   * Renders all defined paths on a HTML element.
   *
   * @param {HTMLElement} element HTML element
   * @returns {Diagram.DSL.SequenceDiagram}
   *
   * @see {@link render} for further information.
   */
  SequenceDiagram.prototype.renderTo = function (element) {
    if (element) {
      this.element = element;
    }

    var output = this.render();

    var parsedOutput = Diagram.parse(output);
    this.element.innerHTML = '';
    parsedOutput.drawSVG(this.element, {theme: this.theme});

    return this;
  };

  /**
   * Creates a Canvas element which will be used to draw a bitmap of the original SVG element.
   *
   * The SVG element will be read as XML and then converted into a Base64 inline image,
   * which can be drawn on the canvas. After the image is drawn, a pseudo-anchor tag will be created
   * and triggered, in order to display the browser's download dialog.
   */
  SequenceDiagram.prototype.saveAsPng = function () {
    // Get dimension
    var svgElement = this.element.firstChild;
    var svgWidth = svgElement.getBoundingClientRect().width;
    var svgHeight = svgElement.getBoundingClientRect().height;

    var width = Math.ceil(svgWidth);
    var height = Math.ceil(svgHeight);

    // Draw canvas
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'none';
    this.element.appendChild(canvas);

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
      self.element.appendChild(anchor);
      anchor.click();

      // Remove util elements
      canvas.remove();
      anchor.remove();
    };
  };

  return SequenceDiagram;

})();
