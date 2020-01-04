import { html, fixture, expect } from '@open-wc/testing';

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
      expect(el).visible;
    });
  });

  describe('Progressive enhancement features', () => {
    it('Should upgrade headings to toggle buttons', async () => {
      const el = await fixture(defaultFixutre);

      const button = el.querySelector('[data-summary] > button');
      expect(button.textContent).equal('Panel one');
    });
    
    it('Should upgrade panels with hidden attribute', async () => {
      const el = await fixture(defaultFixutre);
      
      const panel = el.querySelector('[data-panel]');
      expect(panel.hidden);
    });
  });
  
  describe('Interactions', () => {
    it('Toggles panel and fires customEvent when button is clicked', async () => {
      const el = await fixture(defaultFixutre);
      const button = el.querySelector('[data-summary] > button');
      const panel = el.querySelector('[data-panel]');
      // Panel should be hidden/not expanded by default
      expect(button.getAttribute('aria-expanded')).equal('false');
      
      let eventCounter = 0;
      document.addEventListener('accordion-container-toggled', event => {
        eventCounter++;
      });

      // Panel is shown and button is set to expanded
      button.click();
      expect(panel.visible);
      expect(button.getAttribute('aria-expanded')).equal('true');

      // Toggle panel closed again
      button.click();
      expect(panel.hidden);
      expect(button.getAttribute('aria-expanded')).equal('false');
      
      // Custom event should have been fired twice
      expect(eventCounter).equal(2);
    });
    
    it('Down arrow key cycles focus', async () => {
      const el = await fixture(defaultFixutre);
      const toggles = el.querySelectorAll('[data-summary] > button');
      toggles[0].focus();
      
      const downKeyEvent = new KeyboardEvent('keydown', {
        keyCode: 40,
        bubbles: true
      });

      toggles[0].dispatchEvent(downKeyEvent);
      expect(toggles[1]).equal(document.activeElement);
      
      toggles[1].dispatchEvent(downKeyEvent);
      expect(toggles[2]).equal(document.activeElement);
      
      // If down key is pressed on last toggle focus should return to first
      toggles[2].dispatchEvent(downKeyEvent);
      expect(toggles[0]).equal(document.activeElement);
    });
    
    it('Down up arrow key cycles focus', async () => {
      const el = await fixture(defaultFixutre);
      const toggles = el.querySelectorAll('[data-summary] > button');
      toggles[0].focus();

      const upKeyEvent = new KeyboardEvent('keydown', {
        keyCode: 38,
        bubbles: true
      });

      toggles[0].dispatchEvent(upKeyEvent);
      expect(toggles[2]).equal(document.activeElement);

      toggles[2].dispatchEvent(upKeyEvent);
      expect(toggles[1]).equal(document.activeElement);

      // If down key is pressed on last toggle focus should return to first
      toggles[1].dispatchEvent(upKeyEvent);
      expect(toggles[0]).equal(document.activeElement);
    });
  });
});
