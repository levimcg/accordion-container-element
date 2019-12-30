# Accordion Container Element
An accessible [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) wrapper that adds accordion functionality with keyboard support to a group of headings and panels. Inspired by Github's [tab-container-element](https://github.com/github/tab-container-element). Follows the [ARIA Authoring Practices recommendations for accordions](https://w3c.github.io/aria-practices/#accordion).

## Using the Accordion Container Element
If you want to use it inside a JS module, you can import the accordion container. The accordion container element defines itself using `windown.customElements.define()`, so you will not need to use any kind of named import.

```js
import 'accordion-container-element';
```

or, you can use it in a regular script tag with the `module` attribute.

```html
<script type="module" src="path-to/accordion-container/index.js"></script>
```
By default, the accordion container element has no styling so that you can apply styles however they wish. There are only a couple of requirements for the way the markup inside must be structured.

1. All "summaries" must be a heading (h1-h6) and have a `data-accordion-summary` attribute.
1. All "panels" can be (almost) any HTML element, but must have a `data-accordion-panel` attribute.

```html
<accordion-container>
  <h2 data-accordion-summary>Panel one summary</h2>
  <div data-accordion-panel>
    <p>Panel one content...</p>
  </div>
  <h2 data-accordion-summary>Panel two summary</h2>
  <div data-accordion-panel>
    <p>Panel two content...</p>
  </div>
  <h2 data-accordion-summary>Panel three summary</h2>
  <div data-accordion-panel>
    <p>Panel three content...</p>
  </div>
</accordion-container>
```