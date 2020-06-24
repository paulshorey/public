const test = require('simple-test-framework');

const packagesToString = require('./index');

// SMOKE TEST
const smokeClear = test('if INPUT nothing, OUTPUT must be String', function (t) {
  const string = packagesToString();
  t.check(typeof string === 'string');
  t.finish();

  // REAL TESTS
	test('if INPUT invalid, OUTPUT should fail and throw error', function (t) {
		const inputs = "adlkfjdfkdlj";
		// console.log("test result: `"+packagesToString(inputs)+"`");
		try {
			const string = packagesToString(inputs);
		  t.check(!string, "input is invalid - this is the output: "+string);
		} catch(e) {
		}
	  t.check(!string);
	  t.finish();
	});

	test('if INPUT single value, OUTPUT must match inputs', function (t) {
		const packageName = "newPackage";
		// console.log("test result: `"+packagesToString([packageName])+"`");
	  const string = packagesToString([packageName]);
	  t.check(string.indexOf(packageName) > -1, "package name not found");
	  t.finish();
	});

	test('if INPUT multiple values, OUTPUT comma separated', function (t) {
		const inputs = ["newPackage1","newPackage2"];
		// console.log("test result: `"+packagesToString(inputs)+"`");
	  const string = packagesToString(inputs);
	  t.check(string.indexOf(",") > 0, "comma not found");
	  t.finish();
	});

	test('if INPUT with dependencies, OUTPUT should put the dependencies first', function (t) {
		const inputs = ["p1: something1","p2: something2","p3: something1"];
		// console.log("test result: `"+packagesToString(inputs)+"`");
	  const string = packagesToString(inputs);
	  t.check(string.indexOf("something1") === 0, "`something1` should be first");
	  t.finish();
	});

	test('if INPUT with circular dependencies, OUTPUT should fail and throw error', function (t) {
		const inputs = ["p1: something1","p2: something2","p3: something1", "something1:p1"];
		// console.log("test result: `"+packagesToString(inputs)+"`");
		try {
			const string = packagesToString(inputs);
		  t.check(!string, "this has uncaught circular dependency: "+string);
		} catch(e) {
		}
		t.finish();
	});

});
