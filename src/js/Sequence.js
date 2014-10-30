window.Diagram.DSL = window.Diagram.DSL || {};
window.Diagram.DSL.Sequence = (function () {

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
