/**!
 * accordion-container-element - 0.1.1
 * Copyright (C) 2019 Levi McGranahan
 * MIT License
 */

const accordionToggles = [
  'h1 > button[aria-expanded]',
  'h2 > button[aria-expanded]',
  'h3 > button[aria-expanded]',
  'h4 > button[aria-expanded]',
  'h5 > button[aria-expanded]',
  'h6 > button[aria-expanded]'
].join(',');

const keys = {
  down: 40,
  up: 38,
  home: 36,
  end: 35
};

export default class AccordionContainerElement extends HTMLElement {
  constructor() {
    super();
    // Bind event handlers so we can remove them later
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }
  
  upgradeHeadings() {
    const headings = Array.from(
      this.querySelectorAll('[data-summary]')
    );
    //Loop through all the headings and insert a toggle button inside
    headings.forEach(heading => {
      const button = document.createElement('button');
      button.setAttribute('aria-expanded', 'false');
      const text = heading.textContent;
      button.textContent = text;
      heading.textContent = '';
      heading.appendChild(button);
    });
  }

  upgradePanels() {
    const panels = Array.from(
      this.querySelectorAll('[data-panel]')
    );
    panels.forEach(panel => panel.setAttribute('hidden', ''));
  }

  connectedCallback() {
    this.upgradeHeadings();
    this.upgradePanels();
    this.addEventListener('click', this._handleClick, false);
    this.addEventListener('keydown', this._handleKeydown, false);
  }
  
  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick, false);
    this.removeEventListener('keydown', this._handleKeydown, false);
  }

  _handleClick(event) {
    const toggle = event.target.closest(accordionToggles);
    if (!toggle) return;
    
    const panel = toggle.parentElement.nextElementSibling;
    const eventShouldFire = this.dispatchEvent(
      new CustomEvent('accordion-container-toggled', {
        bubbles: true,
        cancelable: true,
        detail: {
          toggle,
          panel
        }
      })
    );
    if (!eventShouldFire) return;
    
    const isExpanded = toggle.getAttribute('aria-expanded') == 'true' ? true : false;
    toggle.setAttribute('aria-expanded', !isExpanded);
    isExpanded ?
      panel.setAttribute('hidden', '') :
      panel.removeAttribute('hidden');
  }

  _handleKeydown(event) {
    const isRelevantKey =
      event.keyCode == keys.down ||
      event.keyCode == keys.up ||
      event.keyCode == keys.home ||
      event.keyCode == keys.end;

    if (!isRelevantKey) {
      return;
    }
    // Prevent the default so the page doesn't jump around
    event.preventDefault();
    const toggles = Array.from(
      this.querySelectorAll(accordionToggles)
    );

    const currentToggle = document.activeElement;
    const firstToggle = toggles[0];
    const lastToggle = toggles[toggles.length - 1];
    const nextToggle = toggles.indexOf(currentToggle) + 1;
    const previousToggle = toggles.indexOf(currentToggle) - 1;
    
    switch (event.keyCode) {
      case keys.down:
        if (toggles[nextToggle] == undefined) {
          firstToggle.focus();
        } else {
          toggles[nextToggle].focus();
        }
        break;
      case keys.up:
        if (toggles[previousToggle] == undefined) {
          lastToggle.focus();
        } else {
          toggles[previousToggle].focus();
        }
        break;
      case keys.home:
        firstToggle.focus();
        break;
      case keys.end:
        lastToggle.focus();
        break;
      default:
        break;
    }
  }
}

if ('customElements' in window) {
  window.customElements.define('accordion-container', AccordionContainerElement);
}