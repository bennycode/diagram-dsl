function Sequence(command) {
  this.command = command;
  this.arrowStyle = ArrowStyle.default;
}

Sequence.prototype.andOpenArrow = function () {
  this.arrowStyle = ArrowStyle.open;
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
