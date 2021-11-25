import UiFactory from "./UiFacotory.js";
import EventHandler from "./GameEvent.js";

export default class AbilityUi {
  constructor(name) {
    this.name = name;
    this.ui_factory = new UiFactory();
  }

  createClickAbility(abilityConfig, rootElement, callback) {
    const { ui_css_id } = abilityConfig;
    const el = this.ui_factory.assemble(abilityConfig.element);
    this.ui_factory.insertElement(rootElement, el);
    new EventHandler("click").buildHandler(ui_css_id, callback);
  }
}
