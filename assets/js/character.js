export class Character {
  constructor() {
    this.name = "";
    this.title = "";
    this.hitPoints = 50;
    this.skills = [];
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
    this.classType = "";
    this.equipment = [];
    this.inventory = [];
    this.completedQuests = [];
  }
}
