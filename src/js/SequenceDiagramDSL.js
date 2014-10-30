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

  if (style) {
    this.style = style;
  }
}

SequenceDiagram.prototype.render = function () {
  var output = "";

  if (this.title) {
    output += "title: " + this.title + "\n";
  }

  for (var i = 0; i < this.sequences.length; i++) {
    var sequence = this.sequences[i];
    output += sequence.toString() + '\n';
  }

  return output;
};

SequenceDiagram.prototype.renderTo = function ($element) {
  var output = this.render();
  $element.html(output);
  $element.sequenceDiagram({theme: this.style});
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


