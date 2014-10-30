js-sequence-diagrams-dsl
========================

DSL for https://github.com/bramp/js-sequence-diagrams

- [js-sequence-diagrams (gh-pages)](http://bramp.github.io/js-sequence-diagrams/)
- [js-sequence-diagrams (repository)](https://github.com/bramp/js-sequence-diagrams/)

## Getting started

```bash
# Resolve Node.JS and Bower modules
npm install
bower install
```

## Demo

### Code

```js
var bart = 'Bart';
var homer = 'Homer';
var lisa = 'Lisa';
var marge = 'Marge';

var diagram = new SequenceDiagram('A Day At The Simpsons', DiagramStyle.handDrawn);
var element = $('#mySequenceDiagram');

diagram.sequences = [
  from(bart).lineTo(homer).withText('annoys'),
  from(homer).lineTo(bart).withText('chokes'),
  from(bart).dashTo(lisa).withText('annoys'),
  from(lisa).dashTo(marge).withText('stools at'),
  from(marge).lineTo(bart).withText('gives house arrest').andOpenArrow()
];

diagram.renderTo(element);
```

### Result

## Options

```
Diagram.DSL

->	Normal line		(lineTo)
-->	Dashed line		(dashTo)

(withText)

->>	Open arrow		(andOpenArrow)
-->>	Dashed open arrow	(andDashedOpenArrow)


var a = 'Andrew';
var b = 'China';

from(a).lineTo(b).withText('Hello World');
from(a).lineTo(b).withText('Hello World').andOpenArrow();
```
