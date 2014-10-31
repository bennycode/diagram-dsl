# Diagrams.DSL

**Diagrams.DSL** adds some nice convenience methods to the famous [**JS Sequence Diagrams**](https://github.com/bramp/js-sequence-diagrams) library, which turns text into UML sequence diagrams. With **Diagrams.DSL** you can use code statements instead of string commands, to draw your sequence diagrams. It also gives you the possibility to save your sequence diagram as a PNG image.

## :star2: Advantages :star2:
- No need to remember the [JS Sequence Diagrams syntax](http://bramp.github.io/js-sequence-diagrams/)
- IDE **Autocompletion** for writing sequence commands
- Easy renaming of names and actions with **variables**
- Possibility to save your diagram as a **bitmap image** (PNG)
- Possibility to **dynamically** create your sequences

## Quick Example

### Code

```html
<!-- HTML -->
<div id="diagram"></div>

<!-- JavaScript -->
<script>
  with (Diagram.DSL) {
    var bart = 'Bart';
    var homer = 'Homer';
    var lisa = 'Lisa';
    var marge = 'Marge';

    var diagram = new SequenceDiagram('A Day At The Simpsons', DiagramTheme.HAND_DRAWN);
    var element = $('#diagram');

    diagram.sequences = [
      from(bart).lineTo(homer).withText('annoys'),
      from(homer).lineTo(bart).withText('chokes'),
      from(bart).dashTo(lisa).withText('annoys'),
      from(lisa).dashTo(marge).withText('stools at'),
      from(marge).lineTo(bart).withText('gives house arrest').andOpenArrow()
    ];

    diagram.renderTo(element);
  }
</script>
```

### Result

![Result screenshot](http://welovecoding.github.io/diagrams-dsl/demo/demo.png)

If you want to save it as a PNG image:

```js
diagram.saveAsPng();
```


## Syntax samples

- **[Create diagram](#constructor)**
- **[Normal line](#lineTo)** `->`
- **[Dashed line](#dashTo)** `-->`
- **[Open arrow](#andOpenArrow)** `->>`
- **[Dashed open arrow](#dashToAndOpenArrow)** `->>`
- **[Render diagram](#render)**

### <a name="constructor"></a> Create diagram

```js
// Create a standard diagram
var diagram = new SequenceDiagram();

// Create a diagram with a title
var diagram = new SequenceDiagram('Title');

// Create a diagram with a title and default theme
var diagram = new SequenceDiagram('Title', DiagramTheme.DEFAULT);

// Create a hand-drawn diagram with a title
var diagram = new SequenceDiagram('Title', DiagramTheme.HAND_DRAWN);

```

### <a name="lineTo"></a> Normal line

```js
from('A').lineTo('B').withText('Hello World')
```

### <a name="dashTo"></a> Dashed line

```js
from('A').dashTo('B').withText('Hello World')
```

### <a name="andOpenArrow"></a> Open arrow

```js
from('A').lineTo('B').withText('Hello World').andOpenArrow()
```

### <a name="dashToAndOpenArrow"></a> Dashed open arrow

```js
from('A').dashTo('B').withText('Hello World').andOpenArrow()
```

### <a name="render"></a> Render diagram

After all sequences have been added to a Diagram, it can be rendered to a DOM element with:

```js
diagram.renderTo(element);
```

If it has been rendered to a DOM elment, than it also can be exported as a PNG image:

```js
diagram.saveAsPng();
```

## Build & run project

```bash
# First time run
npm install
bower install

# After that just do
grunt default
```

## Nice reads
- [Composing DSLs in JavaScript](https://blog.jcoglan.com/2008/03/21/composing-dsls-in-javascript/)
- [Saving Browser-based SVGs as Images](http://spin.atomicobject.com/2014/01/21/convert-svg-to-png/)

