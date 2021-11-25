export default class ItemIcon {
  constructor(PHSR) {
    this.PHSR = PHSR;
    this.itemSpriteSheet = "generalItem";
  }

  loadItemSpriteSheets() {
    this.PHSR.load.spritesheet(
      this.itemSpriteSheet,
      "assets/img/items/iconset_32x32_01_standalone.png"
    );
  }

  // Load a spritesheet with phaser
  // Load individual sprite form sheet by specifying x, y coords
  getItemIcon(x, y) {
    this.PHSR.add.sprite(x, y, this.itemSpriteSheet);
  }
}
