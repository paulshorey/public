# Interview assignment by PAUL SHOREY for PLURALSIGHT  
  
> INPUT: array of packages and their dependencies  
  
> OUTPUT: a comma-separated string of packages in order of which to load first so as to not break anything  
  
## Rundown  
  
Coding and testing assignment for PluralSight. I copied the code for the package manager from the repo mentioned below, then changed it to PluralSight specs. Then, I added tests. I did not want to add all the standard frameworks like Mocha and Jest, because I thought they would take up a lot of space and resources compared to how tiny the actual codebase is. Maybe that was a mistake. Instead, I went with a tiny lightweight testing framework: "simple-test-framework".  
  
  
## Test  
  
run:  
```  
npm test  
```  
  
  
## Use  
  
```js  
const packagesToString = require('packages-to-string')  
console.log(packagesToString())  
//  
  
console.log(packagesToString(["somePackage"]))  
// somePackage  
  
console.log(packagesToString(["p1","p2","p3"]))  
// p1, p2, p3  
  
console.log(packagesToString(["p1: something1","p2: something2","p3: something1"]))  
// something1, p1, something2, p2, p3  
  
console.log(packagesToString(["p1: something1","p2: something2","p3: something1","something1: p1"]))  
// Error: circular dependency  
```  
  
## Repo at:  
  
Has been deleted from my GitHub. Sorry about that. Anyway, the way I did the tests were unorthodox, so it wouldn't have helped another person, or would be obvious, if someone copied it. :)  
  
Repository started from <a href="https://github.com/gr2m/funky-sloth-42">https://github.com/gr2m/funky-sloth-42</a>, but only used as a template. No original code remains.  
  
  
