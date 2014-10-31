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
  with (window.Diagram.DSL) {
    var bart = 'Bart';
    var homer = 'Homer';
    var lisa = 'Lisa';
    var marge = 'Marge';

    var diagram = new SequenceDiagram('A Day At The Simpsons', DiagramStyle.HAND_DRAWN);
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

- **[Normal line](#lineTo)** `->`
- **[Dashed line](#dashTo)** `-->`
- **[Open arrow](#andOpenArrow)** `->>`
- **[Dashed open arrow](#dashToAndOpenArrow)** `->>`

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

## Build project

```bash
# Resolve Node.JS and Bower modules
npm install
bower install
```

## Nice reads
- [Composing DSLs in JavaScript](https://blog.jcoglan.com/2008/03/21/composing-dsls-in-javascript/)
- [Saving Browser-based SVGs as Images](http://spin.atomicobject.com/2014/01/21/convert-svg-to-png/)

