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
