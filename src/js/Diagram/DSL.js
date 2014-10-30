window.Diagram = Diagram;

if (typeof window.Diagram === "undefined") {

  console.warn('Cannot find "window.Diagram" library. Did you forgot to include it?');
  console.warn('You can get it here: https://github.com/bramp/js-sequence-diagrams/');

} else {

  window.Diagram.DSL = window.Diagram.DSL || {};
  window.Diagram.DSL.from = function from(actorA) {
    return new Diagram.DSL.Action(actorA);
  }

}
