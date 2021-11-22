export default class UiFactory {
  constructor() {
    this.elementCollection = [];
  }

  assemble(elementConfig) {
    const el = document.createElement(elementConfig.type);
    for (const attribute in elementConfig.attributes) {
      el.setAttribute(attribute, elementConfig.attributes[attribute]);
    }
    this.elementCollection.push(el);
    if (elementConfig.content) el.innerHTML = elementConfig.content;

    return el;
  }

  insertElement(parentElement, child) {
    parentElement.appendChild(child);
    // If there are RPGUI elements to create
    if (child.dataset.create) {
      RPGUI.create(child, child.dataset.create);
    }
    return parentElement;
  }
}
