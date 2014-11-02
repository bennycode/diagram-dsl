# Diagrams.DSL

**Diagrams.DSL** adds some nice convenience methods to the famous [**JS Sequence Diagrams**](https://github.com/bramp/js-sequence-diagrams) library, which turns text into UML sequence diagrams. With **Diagrams.DSL** you can use code statements instead of string commands, to draw your sequence diagrams. It also gives you the possibility to save your sequence diagram as a PNG image.

## :star2: Advantages :star2:
- No need to remember the [JS Sequence Diagrams syntax](http://bramp.github.io/js-sequence-diagrams/)
- IDE **Autocompletion** for writing sequence commands
- Easy renaming of names and actions with **variables**
- Possibility to save your diagram as a **bitmap image** (PNG)
- Possibility to **dynamically** create your sequences

## Introduction

### 1. Add JavaScript libraries

```html
<script src="jquery/jquery.min.js"></script>
<script src="underscore/underscore-min.js"></script>
<script src="raphael/raphael-min.js"></script>
<script src="js-sequence-diagrams/sequence-diagram-min.js"></script>
<script src="diagrams-dsl/diagrams-dsl.min.js"></script>
```

### 2. Add a DOM element

```html
<div id="diagram"></div>

```

### 3. Draw your diagram

```js
// Setup diagram
var diagram = new Diagram.DSL.SequenceDiagram();
diagram.renderTo($('#diagram'));

// Draw a path
Diagram.DSL.from('A').lineTo('B').withText('Hello').on(diagram);
```

### 4. There is no step four!

Just look at your result:

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-1.png)

## Do more with it

### Add more paths

If you want to add another line to your diagram, then just draw a second path:

```js
// Draw another path
Diagram.DSL.from('A').lineTo('C').withText('World').on(diagram);
```

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-2.png)

You can also add a third one, which would make it to:

```js
var diagram = new Diagram.DSL.SequenceDiagram();
diagram.renderTo($('#diagram'));

Diagram.DSL.from('A').lineTo('B').withText('Hello').on(diagram);
Diagram.DSL.from('A').lineTo('C').withText('World').on(diagram);
Diagram.DSL.from('A').lineTo('D').withText('!').on(diagram);
```

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-3.png)

### Draw dashed lines

You can use `dashTo` instead of `lineTo` if you want to draw dashed lines:

```js
Diagram.DSL.from('A').lineTo('B').withText('Hello').on(diagram);
Diagram.DSL.from('A').lineTo('C').withText('World').on(diagram);
Diagram.DSL.from('A').dashTo('D').withText('!').on(diagram);
```

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-4.png)

## Draw open arrows

If you want to have an opened arrow instead of a filled one, then use the `andOpenArrow()` function after calling `withText`. It would look like this:

```js
Diagram.DSL.from('A').lineTo('B').withText('Hello').on(diagram);
Diagram.DSL.from('A').lineTo('C').withText('World').andOpenArrow().on(diagram);
Diagram.DSL.from('A').dashTo('D').withText('!').on(diagram);
```

Check how the arrow of the second path is renderd:

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-5.png)

## Add title

If you want to have a title for your diagram, then you should have a title. Just instantiate your diagram object with a `String` literal:

```js
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram');
```

You will get something like this:

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-6.png)

## Change theme

Uh, did we mention, that you can draw your diagram in a different style? At the moment we support `Theme.HAND_DRAWN` and `Theme.DEFAULT`. You used already the default theme, so let's see how the hand-drawn theme looks like:

```js
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);
```

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-7.png)

If you want to switch back, just use:


```js
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.DEFAULT);
```

Or even simpler:

```js
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram');
```

## Draw with statement collection

You can also define your drawing statements before rendering the diagram. But first let's see how our sample code looks like at the moment:

```js
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);
diagram.renderTo($('#diagram'));

Diagram.DSL.from('A').lineTo('B').withText('Hello').on(diagram);
Diagram.DSL.from('A').lineTo('C').withText('World').andOpenArrow().on(diagram);
Diagram.DSL.from('A').dashTo('D').withText('!').on(diagram);
```

We can easily turn the above code into this one:

```js
// Create diagram
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);

// Define paths
diagram.sequences = [
  Diagram.DSL.from('A').lineTo('B').withText('Hello'),
  Diagram.DSL.from('A').lineTo('C').withText('World').andOpenArrow(),
  Diagram.DSL.from('A').dashTo('D').withText('!')
];

// Render diagram
diagram.renderTo($('#diagram'));
```

The difference is now, that you initialize the `sequences` array instead of writing single statements to draw the path.

You can also combine the `sequences` approach with the statements approach. So let us add a fourth path:

```js
// Create diagram
var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);

// Define paths
diagram.sequences = [
  Diagram.DSL.from('A').lineTo('B').withText('Hello'),
  Diagram.DSL.from('A').lineTo('C').withText('World').andOpenArrow(),
  Diagram.DSL.from('A').dashTo('D').withText('!')
];

// Render diagram
diagram.renderTo($('#diagram'));

// Add another path and automatically render the update
Diagram.DSL.from('D').lineTo('A').withText('Return').on(diagram);
```

The result will be:

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-8.png)

## Variables

Now that we have `A`, `B`, `C` and `D` it's time to use variables to easily rename those paths. Let's do it:

```js
var a = 'A';
var b = 'B';
var c = 'C';
var d = 'D';

var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);
diagram.renderTo($('#diagram'));

Diagram.DSL.from(a).lineTo(b).withText('Hello').on(diagram);
Diagram.DSL.from(a).lineTo(c).withText('World').on(diagram);
Diagram.DSL.from(a).dashTo(d).withText('!').on(diagram);
Diagram.DSL.from(d).lineTo(a).withText('Return').on(diagram);
```

We can also put the output element into a variable:

```js
var a = 'A';
var b = 'B';
var c = 'C';
var d = 'D';

var element = $('#diagram');

var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);
diagram.renderTo(element);

Diagram.DSL.from(a).lineTo(b).withText('Hello').on(diagram);
Diagram.DSL.from(a).lineTo(c).withText('World').on(diagram);
Diagram.DSL.from(a).dashTo(d).withText('!').on(diagram);
Diagram.DSL.from(d).lineTo(a).withText('Return').on(diagram);
```

Using variables is quite comfortable, because we can rename every actor in our diagram in seconds:

```js
var a = 'Bart';
var b = 'Homer';
var c = 'Lisa';
var d = 'Marge';

var element = $('#diagram');

var diagram = new Diagram.DSL.SequenceDiagram('My Diagram', Diagram.DSL.Theme.HAND_DRAWN);
diagram.renderTo(element);

Diagram.DSL.from(a).lineTo(b).withText('Hello').on(diagram);
Diagram.DSL.from(a).lineTo(c).withText('World').on(diagram);
Diagram.DSL.from(a).dashTo(d).withText('!').on(diagram);
Diagram.DSL.from(d).lineTo(a).withText('Return').on(diagram);
```

In the blink of an eye, we got this:

![Result](http://welovecoding.github.io/diagrams-dsl/demo/intro-9.png)


## Save diagram as bitmap image (PNG)

Now that you learned almost everything about **Diagram.DSL**, it's time to save your diagram as a PNG image. Simply do:

```js
diagram.saveAsPng();
```

That's it! Your browser will ask you where to save the image.

## Drop Diagram.DSL namespace

In our examples, we made much use of the `Diagram.DSL.` syntax. You can drop it, using the `with` keyword in JavaScript. Your code can then look like this:

```js
with (window.Diagram.DSL) {

  var diagram = new SequenceDiagram('My Diagram', Theme.HAND_DRAWN);
  diagram.renderTo(element);

  from(a).lineTo(b).withText('Hello').on(diagram);
  from(a).lineTo(c).withText('World').on(diagram);
  from(a).dashTo(d).withText('!').on(diagram);
  from(d).lineTo(a).withText('Return').on(diagram);

  diagram.saveAsPng();

}
```

Isn't that cool!?  

So, we wish you lots of fun with our library. 
Don't hasitate to ask question about it or write feature request.

## Build & run the project

If you want to extend **Diagram.DSL** or contribute to the project, then you need to build it first. To resolve all the Node.JS and Bower modules, you have to run these commands from the project's directory:

```bash
npm install
bower install
```

You only need to do the previous step once (or when new dependencies are added to the project). After that you can just go with:

```
grunt default
```

Or even simpler:

```
grunt
```

