import UiFactory from "./UiFacotory.js";
import { helloWorld } from "./globalFunctions.js";
export default class PlayerUi {
  constructor() {
    this.factory = new UiFactory();
    this.hudElements = [
      {
        type: "div",
        attributes: {
          id: "player_hp",
          class: "rpgui-progress green f_col c3",
          "data-create": "progress",
        },
      },
      {
        type: "h2",
        attributes: {
          id: "action_points",
          class: "my_auto f_col c2 ml_auto",
        },
        content: "AP 2/2",
      },
      {
        type: "h2",
        attributes: {
          id: "player_level",
          class: "my_auto f_col c2 ml_auto",
        },
        content: "Level: 1",
      },
      {
        type: "button",
        attributes: {
          id: "player_stats",
          class: "rpgui-button",
        },
        content: "Hello",
        children: [
          {
            type: "img",
            attributes: {
              id: "player_stats_icon",
              class: "",
              src: "",
            },
          },
        ],
      },
    ];
    this.elementCollection = [];
  }

  build(element) {
    switch (element) {
      case "hud":
        this._buildHud();
        break;
    }
  }
  _buildHud() {
    this.hudElements.forEach((hudEl) => {
      const el = this.factory.assemble(hudEl);
      this.factory.insertElement(document.getElementById("hud"), el);
    });
  }
}
