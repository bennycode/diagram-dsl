window.Diagram.DSL.Command = (function () {

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
