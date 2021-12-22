import AbilityUi from "./AbilityFactory.js";
import { ACTION_BAR } from "./commonDomElements.js";
import { playerAnimationsConfig } from "./playerFrames.js";
import PlayerUi from "./PlayerUi.js";

export class Character {
  constructor() {
    this._name = "";
    this._title = "";
    this._hitPoints = 50;
    this.skills = [];
    this.hit = 0.9;
    this.crititcal = 0.05;
    this.avoidance = 0.05;
  }

  set hitPoints(hp) {
    this._hitPoints = hp;
  }

  set name(name) {
    this._name = name;
  }

  set title(title) {
    this._title = title;
  }

  get name() {
    return this._name;
  }

  get title() {
    return this._title;
  }

  get hitPoints() {
    return this._hitPoints;
  }
}

export class Player extends Character {
  constructor(PHSR) {
    super();
    this.gold = 0;
    this.PHSR = PHSR;
    this.inventoryCounter = 0;
    this.archeType = "warrior";
    this.equipped = {
      helm: [],
      chest: [],
      mainhand: [],
      offhand: [],
      belt: [],
      boots: [],
      heirloom: [],
    };
    this.inventory = new Map(); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    this.completedQuests = new Map();
    this.maxInventorySize = 30;
    this.playerIsRunning = false;
    this.playerIsDefensive = false;
    this.playerIsBusy = false; // Blocking, Attacking, Dead
    this.animationNames;
    this.playerScale = 3.5;
    this.playerId = "player";
  }

  addToInventory(item) {
    if (this.inventory.size < this.maxInventorySize) {
      console.log(`${item.name} has been placed in your Inventory.`);
      this.inventory.set(`${this.inventoryCounter}. ${item.name}`, item);
      this.inventoryCounter++;
      return `${item.name} has been placed in your Inventory.`;
    } else {
      console.log("Inventory is full.");
    }
  }

  equipItem(item) {
    if (!this.equipped[item.slot].length) {
      this.equipped[item.slot].push(item);
      console.log(`Equipped ${item.name}`);
      return `Equipped ${item.name}`;
    } else {
      console.log(
        `Cannot equip ${item.name}. You have ${
          this[item.slot][0].name
        } equipped already.`
      );

      return `Cannot equip ${item.name}. You have ${
        this[item.slot][0].name
      } equipped already.`;
    }
  }

  /**
   * Look at special stat bonuses from equipped items and apply to player stats
   */
  applyEquippedItemEffects() {}

  useAbility() {}

  initHandlers() {
    const { config } = playerAnimationsConfig;
    const { attack1 } = playerAnimationsConfig.meta.handlers.click;

    this.createPlayerAbility(attack1, ACTION_BAR, () => {
      if (!this.playerIsBusy) {
        this.playerIsBusy = true;
        this.playerSprite.play(config.attack1.settings.key, true);
      }
    });

    this.playerSprite.on(
      "animationcomplete",
      () => {
        this.playerIsBusy = false;
        this.playerIsRunning = false;
      },
      this
    );
  }

  initPlayer() {
    new PlayerUi().build("hud");

    this.playerSprite = this.PHSR.add
      .sprite(280, 200)
      .setScale(this.playerScale);
  }

  updatePlayer() {
    if (!this.playerIsRunning && !this.playerIsBusy) {
      if (!this.playerIsDefensive) {
        this.playerSprite.play("player_idle", true);
      } else {
        this.playerSprite.play("player_block_idle", true);
      }
    }

    if (this.playerIsBusy) this.disableButtons = true;
    else this.disableButtons = false;

    ACTION_BAR.querySelectorAll("button").forEach((button) => {
      button.disabled = this.disableButtons;
    });
  }

  /**
   * Creates a click handler and passes the action to perform for the event
   * @param {string} domElementId
   * @param {function} action
   * @param {string} eventType
   */
  createPlayerAbility(abilityConfig, rootElement, action) {
    new AbilityUi().createClickAbility(abilityConfig, rootElement, action);
  }

  endTurn() {}
}

/**
 * Enemy Types
 * --------------
 * 1. Minion - Weakest
 * 2. Soldier - Normal Difficulty
 * 3. Elite - Hard Difficulty
 * 4. Miniboss - Very Hard Difficulty
 * 5. Boss - Hardest Difficulty
 *
 */
export class Enemy extends Character {
  constructor() {
    super();
    this.archeType = "NPC";
  }

  generateNewEnemy() {}
  updateEnemy() {}
  decideMove() {}
  die() {}
  attack() {}
  defend() {}
  endTurn() {}
}
