# scheme-interpreter
Scheme Interpreter in Node.js

# Usage
## Install
```
$ npm install watilde/scheme-interpreter
```

## Example
Scheme file:
```scheme
(+ 1 2)
```

Node.js file:
```js
const fs = require('fs')
const scheme = require('scheme-interpreter')

const file = fs.readFileSync('./main.scm', 'utf8')
scheme(file)
// => 3
```

# Based on
Thanks to http://norvig.com/lispy.html
