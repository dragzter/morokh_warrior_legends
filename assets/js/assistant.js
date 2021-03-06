export default class Assistant {
  /**
   * Delegate of Phaser.Scene
   * @param {class} PHSR
   */
  constructor(PHSR) {
    this.frameObjects = [];
    this.animationNames = [];
    this.assets = [];
    this.loader = PHSR.load;
    this.animator = PHSR.anims;
    this.charAssetsPath = "assets/img/characters/";
    this.bgAssetPath = "assets/img/bg/";
    this.animationImages = [];
    this.add = PHSR.add;
    this.sprite;
  }
  /**
   * Packages png paths into iterable object for frame animations.
   * @param {[key:string] = string} pngList
   * @returns [{[key:string]: string}]
   */
  getFrameObject(pngList) {
    let temp = [];
    for (const item in pngList) {
      temp.push({
        key: item,
      });
    }
    return temp;
  }

  getGeneratedFrames(key) {
    return this.animator.generateFrameNumbers(key);
  }

  /**
   * Create animations based on config.
   * Can create animations with single images or entire spritesheets
   * This runs in the create() method in the Phaser scene
   * @param {bool} generated
   */
  createAnimations() {
    this.animationImages.forEach((anim) => {
      for (const animation in anim.config) {
        const { settings, sprites } = anim.config[animation];
        // fromSingles implies that we are building the animation from single images
        // Otherwise were are using spritessheets via phasers animator method
        // this.anims.generateFrameNumbers("some_string_key")
        const _frames = anim.config[animation].fromSingles
          ? this.getFrameObject(sprites)
          : this.getGeneratedFrames(settings.key);

        const animationConfig = {
          frames: _frames,
          ...settings,
        };

        this.animator.create(animationConfig);
      }
    });
  }

  /**
   * Loads images for animations using single images
   * @param {*} loader - Phaser3 image loader
   * @param {*} assets - Images to load
   */
  loadImageCollection(config) {
    this.animationImages.push(...config);
    this.animationImages.forEach((imgs) => {
      for (const image in imgs.config) {
        for (const value in imgs.config[image].sprites) {
          if (imgs.config[image].fromSingles) {
            this.loader.image(value, `${this.charAssetsPath}${imgs.config[image].sprites[value]}`);
          } else {
            this.loader.spritesheet(
              imgs.config[image].settings.key,
              `${this.charAssetsPath}${imgs.config[image].sprites[value]}`,
              imgs.config[image].sprite_dimensions
            );
          }
        }
      }
    });
  }

  /**
   * Load a single Image
   * @param {*} loader - Phaser3 Loader
   * @param {*} image - Single image
   * @returns image.
   */
  loadImage(id, image) {
    return this.loader.image(id, image);
  }

  get getAnimationNames() {
    return this.animationNames;
  }

  get getSprite() {
    return this.sprite;
  }
}
