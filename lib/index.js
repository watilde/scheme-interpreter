"use strict";
const _ = require('underscore')
const math = require('./math')
const operator = require('./operator')

const LispSymbol = String
const LispList = Array
const LispNumber = Number

function parse (program) {
  return read_from_tokens(tokenize(program))
}

function tokenize (str) {
  str = str.replace(/\n/g, '')
  str = str.replace(/\(/g, ' ( ')
  str = str.replace(/\)/g, ' ) ')
  str = str.split(' ')
  return str.filter(function (n) { return n !== ""; })
}

function read_from_tokens (tokens) {
  if (tokens.length === 0)
    throw new SyntaxError('unexpected EOF while reading')
  let token = tokens.shift()
  if ('(' === token) {
    let L = []
    while (tokens[0] !== ')')
      L.push(read_from_tokens(tokens))
    tokens.shift()
    return L;
  } else if (')' === token) {
    throw new SyntaxError('unexpected )')
  } else {
    return atom(token)
  }
}

function atom (token) {
  function isNaN (obj) {
    return typeof obj === "number" && obj !== +obj
  }
  if (isNaN(Number(token))) return new LispSymbol(token)
  return LispNumber(token)
}

function standard_env () {
  let env = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.div,
    '>': operator.gt,
    '<': operator.lt,
    '>=': operator.ge,
    '<=': operator.le,
    '=': operator.eq,
    'append': operator.add,
    'eq?': operator.is_,
    'equal?': operator.eq,
    'not': operator.not_,
  }
  env = _.extend(env, math)
  return _.extend(new Env(), env)
}

class Env {
  constructor (params, args, outer) {
    outer = outer || {}
    this.outer = outer
  }
  find (key) {
    key = key.toString()
    if (Object.keys(this).indexOf(key) !== -1)
      return this[key]
    else
      return this.outer.find(key)
  }
}

var global_env = standard_env()

function procedure (params, body, env) {
  return function () {
    return exec(body, new Env(params, arguments, env))
  }
}

function exec (x, env) {
  env = env || global_env

  if (x instanceof LispSymbol) {
    return env.find(x[0]).apply(null, x.slice(1))
  } else if (x instanceof LispList === false) {
    return x
  }

  const key = x[0].toString()
  if (key === 'quote') {
    return x[1]
  } else if (key === 'if') {
    let exp = (exec(x[1], env)) ? x[2] : x[3]
    return exec(exp, env)
  } else if (key === 'define') {
    env[x[1]] = exec(x[2], env)
  } else if(key === 'set!') {
    env.find(x[1])[x[1]] = exec(x[2], env)
  } else if (key === 'lambda') {
    let params = x.slice(1, -1)
    let body = x.slice(-1)
    return procedure(params, body, env)
  } else {
    let proc = env[x[0]]
    let args = x.slice(1)
    return proc.apply(null, args)
  }
}

module.exports = function (str) {
  return exec(parse(str))
}
