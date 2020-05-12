module.exports = {
    arrayToMap: (ary, key) => {
        let obj = {};
        if (key) {
            for (let o of ary) {
                obj[key] = o;
            }
        }
        return obj;
    },
    removeFromArray: (ary, val) => {
        for (let i = 0, length = ary.length; i < length; i++) {
            if (ary[i] == val) {
                ary.splice(i, 1);
                break;
            }
        }
        return ary;
    },
};
