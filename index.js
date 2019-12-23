const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;

const accordionToggles = [
  "h1 > button[aria-expanded]",
  "h2 > button[aria-expanded]",
  "h3 > button[aria-expanded]",
  "h4 > button[aria-expanded]",
  "h5 > button[aria-expanded]",
  "h6 > button[aria-expanded]"
].join(',');

export default class AccordionContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    // Class methods
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
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
    
    const isExpanded =
      toggle.getAttribute('aria-expanded') == 'true' ? true : false;
    toggle.setAttribute('aria-expanded', !isExpanded);

    const panel = toggle.parentElement.nextElementSibling;
    isExpanded ?
      panel.setAttribute('hidden', '') :
      panel.removeAttribute('hidden');
  }
  
  _handleKeydown(event) {
    const isRelevantKey = event.keyCode == 38 || event.keyCode ==  40;
    if (!isRelevantKey) return;

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
      case 40:
        if (toggles[nextToggle] == undefined) {
          firstToggle.focus();
        } else {
          toggles[nextToggle].focus();
        }
        break;
      case 38:
        if (toggles[previousToggle] == undefined) {
          lastToggle.focus();
        } else {
          toggles[previousToggle].focus();
        }
        break;
      case 36:
        toggles[firstToggle].focus();
        break;
      case 35:
        toggles[lastToggle].focus();
        break;
      default:
        break;
    }
  }

  upgradeHeadings() {
    const headings = Array.from(
      this.querySelectorAll('[data-accordion-summary]')
    );
    
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
      this.querySelectorAll('[data-accordion-panel]')
    );
    panels.forEach(panel => panel.setAttribute('hidden', ''));
  }
}

if ('customElements' in window) {
  customElements.define("accordion-container", AccordionContainer);
}