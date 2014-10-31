Diagram.DSL.Sequence = (function () {

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

  /**
   * Adds another path to a rendered diagram.
   *
   * @param {Diagram.DSL.SequenceDiagram} diagram
   * @returns {Diagram.DSL.SequenceDiagram}
   */
  Sequence.prototype.on = function (diagram) {
    return diagram.addSequence(this);
  };

  return Sequence;

})();
