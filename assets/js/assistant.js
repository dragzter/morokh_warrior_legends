import { playerAnimations } from "./frames.js";

export default class Assistant {
  constructor() {
    this.frameObjects = [];
    this.animationNames = [];
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
  createAnimations(animator) {
    for (const animation in playerAnimations) {
      const { settings, sprites } = playerAnimations[animation];
      const animationConfig = {
        key: settings.key,
        frames: this.getFrameObject(sprites),
        frameRate: settings.frameRate,
      };

      this.animationNames.push({
        key: settings.key,
        busy: settings.busy,
        defensive: settings.defensive ? settings.defensive : false,
        ui: settings.domActivatorID ? settings.domActivatorID : "",
      });

      // Optional property - causes animation to repeat
      if (settings.repeat) animationConfig.repeat = settings.repeat;

      this.frameObjects.push(animator.create(animationConfig));
    }
    return this.frameObjects;
  }

  get getAnimationNames() {
    return this.animationNames;
  }
}
