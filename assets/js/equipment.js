export class Item {
  constructor(name = "Unknown", type = null, attributes = [], slot = null) {
    this.type = type;
    this.name = name;
    this.slot = slot;
    this.attributes = attributes;
  }
  moveItem() {
    // Move item from one inventory slot to another
  }
  deleteItem() {
    // Remove the item form the list of items
  }
  dropItem() {
    // Abandon item
  }
  save() {}
}

export class Weapon extends Item {
  constructor(dmgLow = 0, dmgHigh = 0) {
    super();
    this.dmgLow = dmgLow;
    this.dmgHigh = dmgHigh;
  }
}

export class Armor extends Item {
  constructor(defense = 0) {
    super();
    this.defense = defense;
  }
}
