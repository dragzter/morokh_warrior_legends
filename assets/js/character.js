export class Character {
  constructor() {
    this.name = "";
    this.title = "";
    this.hitPoints = 50;
    this.skills = [];
    this.hit = 0.9;
    this.crititcal = 0.05;
    this.avoidance = 0.05;
  }

  get getName() {
    return this.name;
  }

  get getTitle() {
    return this.title;
  }

  get getHitPoints() {
    return this.hitPoints;
  }
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
 * Player Class
 */

export class Player extends Character {
  constructor() {
    super();
    this.gold = 0;
    this.inventoryCounter = 0;
    this.archeType = "warrior";
    this.equipped = [];
    this.inventory = new Map(); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    this.completedQuests = new Map();
    this.maxInventorySize = 30;
    this.helm = [];
    this.chest = [];
    this.mainhand = [];
    this.offhand = [];
    this.belt = [];
    this.boots = [];
    this.heirloom = [];
  }

  addToInventory(item) {
    // TODO enforce max inventory size
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
    if (!this[item.slot].length) {
      this[item.slot].push(item);
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
}

export class Enemy extends Character {
  constructor() {
    super();
    this.archeType = "NPC";
  }
}
