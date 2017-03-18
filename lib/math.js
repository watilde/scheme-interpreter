var math = {}
var formulas = [
  'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'cbrt',
  'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'hypot',
  'imul', 'log', 'log1p', 'log2', 'log10', 'max', 'min', 'pow', 'random',
  'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
]

formulas.forEach(function (formula) {
  if (Math[formula]) math[formula] = Math[formula]
})

module.exports = math
