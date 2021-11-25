/**
 * This class ise used for creating ui elements.
 * Anyone can use it to assemble and append elements
 */
export default class UiFactory {
  constructor() {
    this.elementCollection = [];
  }

  /**
   * Assembles a DOM node and its children based on provided config.
   * Each child will be appended to the parent.
   * @param {object} elementConfig
   * @returns
   */
  assemble(elementConfig) {
    const el = document.createElement(elementConfig.type);
    for (const attribute in elementConfig.attributes) {
      el.setAttribute(attribute, elementConfig.attributes[attribute]);
    }

    if (elementConfig.children) {
      elementConfig.children.forEach((child) => {
        const childEl = this.setElementAttributes(
          document.createElement(child.type),
          child.attributes
        );
        this.insertElement(el, childEl);
      });
    }
    this.elementCollection.push(el);
    if (elementConfig.content) el.innerHTML = elementConfig.content;

    return el;
  }

  /**
   * Sets attributes on an element and returns it when all properties are set.
   * @param {HTMLElement} el
   * @param {object} attributes
   * @returns HTMLElement
   */
  setElementAttributes(el, attributes) {
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
    return el;
  }

  /**
   * Attach child to specified parent.  IF any of the children
   * have RPGUI elements, they will be built and attached as well.
   * @param {HTMLElement} parentElement
   * @param {HTMLElement} child
   * @returns HTMLElement
   */
  insertElement(parentElement, child) {
    parentElement.appendChild(child);
    // If there are RPGUI elements to create
    if (child.dataset.create) {
      RPGUI.create(child, child.dataset.create);
    }
    return parentElement;
  }
}
