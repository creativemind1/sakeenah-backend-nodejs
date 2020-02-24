module.exports = {
  arrayToMap: (ary, key) => {
    let obj = {};
    if (key) {
      for (let o of ary) {
        obj[key] = o;
      }
    }
  }
};
