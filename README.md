js-sequence-diagrams-dsl
========================

DSL for https://github.com/bramp/js-sequence-diagrams

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
