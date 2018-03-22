
var random = {

  /* Returns a random number between min (inclusive) and max (exclusive) */
  rnd: function rnd(min, max) {
    return Math.random() * (max - min) + min;
  },
  int: function int(min, max) {
    return Math.round(this.rnd(min, max));
  },
  ok: function ok() {
    var okProbability = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

    if (okProbability > 100) throw new Error('Probability must be less then 100');
    if (okProbability < 0) throw new Error('Probability must be more then 0');
    return this.rnd(0, 100) < okProbability;
  },
  str: function str() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var strSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'abcdefghijklmnopqrstuvwxyz';

    var res = '';
    for (var i = 0; i < length; i++) {
      res += strSource[Math.round(this.rnd(0, strSource.length - 1))];
    }
    return res;
  },
  element: function element(arr, quantity) {
    if (quantity === undefined) return arr[this.int(0, arr.length - 1)];
    if (quantity >= arr.length) return arr;

    var arrx = arr.filter(function () {
      return true;
    });
    var res = [];
    for (var i = 0; i < quantity; i++) {
      var k = this.int(0, arrx.length - 1);
      res = res.concat(arrx.splice(k, 1));
    }
    return res;
  },
  randomizeNum: function randomizeNum(val) {
    var percentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    if (val === null) return null;

    var offset = val / 100 * percentage;
    return this.rnd(val - offset, val + offset);
  },
  randomizeInt: function randomizeInt(val) {
    var percentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    if (val === null) return null;
    return Math.round(this.randomizeNum(val, percentage));
  }
};

