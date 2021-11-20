export default class Hud {
  constructor() {
    this.hudElements = [
      {
        type: "div",
        attributes: {
          id: "player_hp",
          class: "rpgui-progress green f_col c3",
        },
        rpgui_id: "progress",
      },
      {
        type: "h2",
        attributes: {
          id: "player_level",
          class: "my_auto f_col c2 ml_auto",
        },
        content: "Level: 1",
      },
    ];
    this.elementCollection = [];
  }

  createAndAppendHudElements(rootElement) {
    this.hudElements.forEach((elConfig) => {
      const el = document.createElement(elConfig.type);
      for (const attribute in elConfig.attributes) {
        el.setAttribute(attribute, elConfig.attributes[attribute]);
      }
      if (elConfig.rpgui_id) el.dataset.create = elConfig.rpgui_id;
      if (elConfig.content) el.textContent = elConfig.content;
      this.elementCollection.push(el);
    });

    this.elementCollection.forEach((elem) => {
      rootElement.appendChild(elem);
      if (elem.dataset.create) {
        RPGUI.create(elem, elem.dataset.create);
      }
    });
  }
}
