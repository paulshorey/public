# Zero setup. Zero dependencies. Full featured.  
You can haz configuration if you want it. Scroll down to find out.  
To install, simply do `npm install colorful-console-logger`.  
  
##  
## It does NOT replace your `console`:  
Instead, simply import it as  
```  
const cconsole = require('colorful-console-logger');  
```  
Or as whatever else you want to call it (`konsole`, `consola`, `consolee`)  
  
#### You may replace your original `console` variable...  
```  
const console = require('colorful-console-logger');  
```  
...if you're daring enough. This worked fine on Node.js v10+. But this has not been tested on other browsers. If you happen to test this on all devices, please let us know if it worked consistently!  
HOWEVER, DO CONSIDER. This console logger makes very bright colors. Also you may want to hook it up to cloud or file logging. So, it might make sense to NEVER overwrite your original **`console`** even if you can. You could use **`console.log`** to print out standard temporary messages, and use **`cconsole.log`** to print out colorful eye-catching messages that get special treatment like saving to cloud or file.  
  
##  
## Instructions:  
#### Once you required/imported it, go ahead and use it same as the normal console:  
```  
cconsole.time();  
cconsole.clear();  
cconsole.log("TEST 55555: 'log'", {testObject: "testObject"});  
cconsole.info("TEST 55555: 'info'", {testObject: "testObject"});  
cconsole.warn("TEST 55555: 'warn'", {testObject: "testObject"});  
cconsole.table([[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e']]);  
cconsole.trace('TEST 55555 log trace');  
cconsole.error(new Error('TEST 55555 log error'));  
cconsole.timeEnd();  
```  
  
##  
## Optional configuration options:  
If you want to get fancy, and you probably should ~ here are some extra options.  
After you've required/imported the cconsole variable, call its secret `config` method.  
You may change options anytime at runtime.  
  
#### 1. Catch Exceptions  
```  
cconsole.config({  
    catchExceptions: true, // default false // make truthy to enable below code...  
});  
```  
Above option will execute this code (below). It will affect your entire codebase by implementing this:  
```  
process.on('uncaughtException', (err) => {  
    console.error('Fatal error!', err);  
});  
```  
All this does is print an error to the console before your application crashes and burns.  
If you specify a `callbackOnError()`, below, then you will also be able to do other stuff before the application exits.  
  
#### 2. Exit process on errors  
```  
cconsole.config({  
    exitOnError: true, // default false  
});  
```  
Above option will execute `process.exit();` after the error message has been output to the console.  
  
#### 3. Execute callback function on error  
```  
cconsole.config({  
    callbackOnError: function(arguments){  
        // Defaults to null  
        // Do whatever you want here. You're passing in this custom function.  
        // Ex: in back-end Node.js, you may want to call `execute("pm2 stop all")`  
        // Ex: in a front-end app, you may want to call `alert(arguments[0])`  
    })  
});  
```  
Above option will execute BEFORE `process.exit();` due to the optional `exitOnError` option.  
Above option will execute AFTER the error message has been output to the console.  
  
#### 4. Pre-process arguments  
```  
cconsole.config({  
    preprocessArguments: function(arguments){  
        // Defaults to null  
        // Do whatever you want here. You're passing in this custom function.  
        // For example, you may loop through each arguments property, and add some prefix or timestamp  
    })  
});  
```  
Above opton will execute BEFORE the message has been output to the console.  
In fact, cconsole serializes error messages as text to better print out in the console. This option executes BEFORE this serialization.  
Inside your function, access the "type" of console.log this is ("info", "warn", etc) with **`this.action`**.  
You may want to use this to send these console logs to some custom "cloud" logger like Winston or Loggly.  
  
#### Do them all at the same time  
```  
cconsole.config({  
    catchExceptions: true,  
    exitOnError: true,  
    callbackOnError: function(arguments){  
        // call some bash script  
        execute('pm2 stop all');  
    }),  
    preprocessArguments: function(arguments){  
        // add prefix  
        for (let a in arguments) {  
            arguments[a] = Date.now() +' ~ '+ arguments[a];  
        }  
        // log to the cloud  
        logDNA[this.action](arguments);  
    })  
});  
```  
