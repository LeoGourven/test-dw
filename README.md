# Datawrapper Test Project: Senior Data Vis Developer

## Part 1 : Build a chart type

Oooh I'm not happy with what I did. I had issues with the dynamic computation of labels and the way react handle that. 100% my fault, I didn't do my homework and lost a bunch of time on that. And it's still not working in a nice way.

The chart can only handle basics cases.

Here what what I would have done next:

-   Properly handle the case with negatives values (split the screen at the right position and not in the center)
-   Add an axis
-   Add grouping, should be trivial with my dom structure
-   Formating the numbers
-   Prevent crash when datasets has no/incorect value,

Refactoring:

-   The props are cryptic and should be handle in a more generic way (x, offset, align)
-   The Computation of dynamic elements should way more simple (Maybe we can render the Labels in offset and get the size)

## Part 2: Design the architecture for supporting further chart types

Supporting multiple charts will require the factorization of common or similar elements. Component and function should do one thing only, but do it well.

Here is a concept of architecture for multiples charts:

### Low Level Components

Low-level components dedicated purely to rendering. They have little intelligence and simply display with the parameters given to them. They can also relay events to their parent (mouseenter, mouseleave, click, etc).

They are fully controlled.

Examples:

-   A component that displays an axis with the requested number of ticks
-   A tooltip
-   A Label
-   An annotation system
-   The title of a chart

These reusable components ensure graphic unity and facilitate updates by centralizing changes.
Note: Some components would probably need to be developed for multiple renderers (HTML, SVG...)

These components are great candidates for unit testing.

### Color Scales and Styles

To maintain graphical consistency in the application, it's necessary to centralize how scales and colors are managed.

These elements should be accessible in both JavaScript and CSS, so they can be used easily in a stylesheet context or in a JavaScript-manipulated D3 color scale.

### Utilities

Common tools between visualizations will be needed: For instance, a number formatting system, a mechanism managing window resizing, or a Voronoi interaction layer that allows for easier interactions on a scatterplot.

### Containers

Containers can be what we call a complete visualization. They will reuse the low-level components described earlier to compose visualizations.

They will manage & control how other components react: for example, if a user hovers over a bubble in a scatterplot, it will direct its low-level components to the following actions:

-   Bubbles that are not hovered should be displayed in low opacity
-   On the X and Y axis, the values of the hovered element should be displayed.

A container could even control several containers and thus charts: Filter elements (like brush types) could filter the data of the visualizations.

### A Chart Type Configurator

Depending on the data present in the dataset, it is possible to make one or several charts. For example, a barchart can be made with only one numerical indicator but not a scatterplot, which requires at least two.

We might need a component that, for a given dataset, provides a list of possible charts that can be used with these data and possibly even the interesting default configurations.
