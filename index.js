#!/usr/bin/env node

const { main } = require('./lib/main');
// Archivo principal de ejecución :)

const concat = (x,y) =>
  x.concat(y)

const flatMap = (f,xs) =>
  xs.map(f).reduce(concat, [])

Array.prototype.flatMap = function(f) {
  return flatMap(f,this)
}

main();