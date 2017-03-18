const _ = require('underscore')
var operator = {
  add: function () {
    var sum = 0
    for (var i = 0; arguments.length > i; i++) {
      sum += arguments[i]
    }
    return sum;
  },
  sub: function () {},
  mul: function () {},
  div: function () {},
  gt: function () {},
  lt: function () {},
  ge: function () {},
  le: function () {},
  eq: function () {},
  is_: function () {},
  not_: function () {}
}

module.exports = operator
