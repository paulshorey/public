/*
 * Uncomment/Comment out the below const console... to enable/disable colorful-console-logger
 * colorful-console-logger tested only a bit slower than regular console, but with many added features.
 * If you are doing some kind of algorithms which need to conserve every millisecond, you shouldn't be using console logs anyway.
 *
 * 1000 various console.whatever() calls below executed in:
 * 100 - 110 ms for regular console
 * 125 - 135 ms for colorful console ( 19% slower )
 */
const console = require('./index.js');

/*
 * Application code below
 */
const someFunction = function () {
    Date.now();
};

console.time();
console.clear();
console.log("TEST 55555: 'log'", {testObject: "testObject"});
console.info("TEST 55555: 'info'", {testObject: "testObject"});
console.warn("TEST 55555: 'warn'", {testObject: "testObject"});
console.table([[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e']]);
console.trace('TEST 55555 log trace');
console.error(new Error('TEST 55555 log error'));
console.log({one: 1, two: {a: "a", b: "b"}});
console.log([1, 2, 3, {fourth: "isAnObject"}]);
console.log(someFunction);
console.timeEnd();
