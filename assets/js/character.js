export default class Character {
  constructor(
    name = "",
    title = null,
    classType = null,
    equipment = [],
    skills = []
  ) {
    this.name = name;
    this.title = title;
    this.classType = classType;
    this.equipment = equipment;
    this.gold = 0;
    this.inventory = [];
    this.skills = skills;
    this.completedQuests = [];
  }
}
