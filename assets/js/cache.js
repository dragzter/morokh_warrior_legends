export default class Cache {
  data;
  _setData(key, data) {
    console.log("Setting data.");
    const savedData = this._read(key);
    console.log(savedData);
    if (savedData) {
      this.data = Object.assign(data, savedData);
    } else {
      this.data = data;
    }
  }
  save(key, data) {
    this._setData(key, data);
    return localStorage.setItem(key, JSON.stringify(this.data));
  }
  _read(key) {
    if (!localStorage.getItem(key)) return;
    console.log("Reading data.");
    return JSON.parse(localStorage.getItem(key));
  }
  print(key) {
    if (!localStorage.getItem(key)) return;
    console.log(JSON.parse(localStorage.getItem(key)));
  }
}
