export default class Assistant {
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
}
