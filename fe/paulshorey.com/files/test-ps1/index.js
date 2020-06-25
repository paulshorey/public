module.exports = packagesToString;

function packagesToString (inputs) { 
	// globals
	const packages = {}; // remember associative array of packages -- key is package name, value is array of dependencies
	const outputArray = []; // list of packages to output

	// validate
	if (!inputs) { // must be something
		return '';
	}
	if (!Array.isArray(inputs)) { // must be array
		throw new Error('Error: input must be an array of packages');
	}

	// iterate
  inputs.forEach(function(whatPackage){ // each package:dependency 
  	if (whatPackage.search(":")) {
  		const split = whatPackage.split(":").map(function(p) { // split the package:dependency
				return p.trim();
			});

			// remember packages
			if (!packages[split[0]]) {
				// if package is new, with or without dependency:
				packages[split[0]] = split[1] ? [split[1]] : [];
			} else if (split[1]) {
				if (packages[split[0]].indexOf(split[1])>-1) {
					// if package already remembered, and needs another dependency:
					packages[split[0]].push(split[1]);
				}
			} else {
				// if package already exists, but does not need another dependency:
				packages[split[0]] = [];
			}

			// build array of packages
			for (const p_name in packages) {
				const pac = packages[p_name];
				if (pac.length) {
					pac.forEach(function(d_name){
						if (outputArray.indexOf(d_name)===-1) {
							outputArray.push(d_name);
						}
					});
				}
				if (outputArray.indexOf(p_name)===-1) {
					outputArray.push(p_name);
				}
			}

  	}
  });


	// check for circular dependencies
	for (const p_in_output in outputArray) {
		const p_name = outputArray[p_in_output];
		if (packages[p_name] && packages[p_name].length) {
			// keeping it simple -- assuming each package only has one dependency
			const d_name = packages[p_name][0];
			const d_in_output = outputArray.indexOf(d_name);
			// sanity check -- don't know if this is possible, but didn't spend much time on this script, so just in case
			if (d_in_output === -1) {
				throw new Error("Oops! Something unexpected happened. The package dependency did not make it to final list.");
			}
			// circular dependency check -- if current package has a dependency, then it should have already come first in this list
			if (d_in_output >= p_in_output) {
				throw new Error("Error: circular dependency");
			}
		}
	}

	// all OK
  return outputArray.join(',');
}