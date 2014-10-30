var ArrowStyle = {
  default: '>',
  open: '>>'
};

var LineStyle = {
  default: '-',
  dashed: '--'
};

var DiagramStyle = {
  default: 'simple',
  handDrawn: 'hand'
};

/**/
function SequenceDiagram(title, style) {
  this.title = title;
  this.sequences = [];
  this.style = DiagramStyle.default;
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
  var unicodeXml = window.btoa(unescape(encodeURIComponent(xml)));

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

/**/
function Sequence(command) {
  this.command = command;
  this.arrowStyle = ArrowStyle.default;
}

Sequence.prototype.andOpenArrow = function () {
  this.arrowStyle = ArrowStyle.open;
  return this;
};

Sequence.prototype.toString = function () {
  return  this.command.action.actorA +
          this.command.action.lineStyle +
          this.arrowStyle +
          this.command.action.actorB +
          ': ' +
          this.command.label;
};

/**/
function Command(action) {
  this.action = action;
  this.label = undefined;
}

Command.prototype.withText = function (label) {
  this.label = label;
  return new Sequence(this);
};

/**/
function Action(actorA) {
  this.actorA = actorA;
  this.actorB = undefined;
  this.lineStyle = LineStyle.default;
}

Action.prototype.lineTo = function (actorB) {
  this.actorB = actorB;
  return new Command(this);
};

Action.prototype.dashTo = function (actorB) {
  this.actorB = actorB;
  this.lineStyle = LineStyle.dashed;
  return new Command(this);
};

/**/
function from(actorA) {
  return new Action(actorA);
}


