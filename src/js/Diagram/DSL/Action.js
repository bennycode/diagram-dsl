window.Diagram.DSL = window.Diagram.DSL || {};
window.Diagram.DSL.Action = (function () {

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
