import { html, fixture, expect, oneEvent, elementUpdated } from '@open-wc/testing';

import '../index.js';

const defaultFixutre = html`
  <accordion-container>
    <h2 data-summary>Panel one</h2>
    <div data-panel>
      Panel one content...
    </div>
    <h2 data-summary>Panel two</h2>
    <div data-panel>
      Panel two content...
    </div>
    <h2 data-summary>Panel three</h2>
    <div data-panel>
      Panel three content...
    </div>
  </accordion-container>
`;

describe('Accordion container element', () => {
  describe('Element creation', () => {
    it('Can be created using document.createElement', async () => {
      const el = await document.createElement('accordion-container');
      expect(el.nodeName).equal('ACCORDION-CONTAINER');
    });
    
    it('Is rendered to the page', async () => {
      const el = await fixture(defaultFixutre);
      expect(el).to.be.visible;
    });
  });

  describe('Progressive enhancement features', () => {
    it('Should upgrade headings to toggle buttons', async () => {
      const el = await fixture(defaultFixutre);

      const button = el.querySelector('[data-summary] > button');
      expect(button.textContent).to.equal('Panel one');
    });
    
    it('Should upgrade panels with hidden attribute', async () => {
      const el = await fixture(defaultFixutre);
      
      const panel = el.querySelector('[data-panel]');
      expect(panel.hidden);
    });
  });
  
  describe('Interactions', () => {
    it('Toggles panel when button is clicked', async () => {
      const el = await fixture(defaultFixutre);
      const button = el.querySelector('[data-summary] > button');
      const panel = el.querySelector('[data-panel]');
      // Panel should be hidden/not expanded by default
      expect(button.getAttribute('aria-expanded')).equal('false');

      // Panel is shown and button is set to expanded
      button.click();
      expect(panel.visible);
      expect(button.getAttribute('aria-expanded')).equal('true');

      // Toggle panel closed again
      button.click();
      expect(panel.hidden);
      expect(button.getAttribute('aria-expanded')).equal('false');
    });
    
    it('Down arrow key cycles focus', async () => {
      const el = await fixture(defaultFixutre);
      const toggles = el.querySelectorAll('[data-summary] > button');
      toggles[0].focus();

      // document.addEventListener('keydown', event => {
      //   if (event.code == 'ArrowDown') {
      //     console.log(event.target);
      //   }
      // });
      
      toggles[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'ArrowDown',
          bubbles: true
        })
      );

      expect(toggles[1]).equal(document.activeElement);
    });
  });
});
