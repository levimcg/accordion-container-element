# Accordion Container Element
An accessible [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) wrapper that adds accordion functionality with keyboard support to a group of headings and panels.

- ✅ Follows progressive enhancement best practices. E.g. if `customElements` aren't supported, content falls back to headings and text/panel content.
- ✅ Follows the [ARIA Authoring Practices recommendations for accordions](https://w3c.github.io/aria-practices/#accordion).

Inspired by Github's [tab-container-element](https://github.com/github/tab-container-element). 

## Using the Accordion Container Element
If you want to use it inside a JS module, you can import the accordion container. The accordion container element defines itself using `windown.customElements.define()`, so you will not need to use any kind of named import.

```js
import 'accordion-container-element';
```

or, you can use it in a regular script tag with the `module` attribute.

```html
<script type="module" src="path-to/accordion-container/index.js"></script>
```

## Accordion markup
By default, the accordion container element has no styling so that you can apply styles however they wish. There are only a couple of requirements for the way the markup inside must be structured.

1. All "summaries" must be a heading (h1-h6) and have a `data-summary` attribute.
1. All "panels" can be (almost) any HTML element, but must have a `data-accordion-panel` attribute.

When the accordion container is connected to the DOM the headings inside will be progressively enhanced by wrapping the heading's `textContent` with a button used for toggling the visibility of each panel. This means that if there's an error loading the script or JavaScript is not available for some reason, all the accordion content will still be accessible as some regular headings and text. 🙌

```html
<accordion-container>
  <h2 data-summary>Panel one summary</h2>
  <div data-panel>
    <p>Panel one content...</p>
  </div>
  <h2 data-summary>Panel two summary</h2>
  <div data-panel>
    <p>Panel two content...</p>
  </div>
  <h2 data-summary>Panel three summary</h2>
  <div data-panel>
    <p>Panel three content...</p>
  </div>
</accordion-container>
```