function Command(action) {
  this.action = action;
  this.label = undefined;
}

Command.prototype.withText = function (label) {
  this.label = label;
  return new Sequence(this);
};
