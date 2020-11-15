import CConsoleLog from "./function/CConsoleLog"

/**
 * Log to console, and optionally to your custom cloud functions
 *
 *    In console, will color code each message:
 *        info: green
 *        warn: orange
 *        error: red
 *    Other methods (log, debug, trace, table, are not colored,
 *    because the coloring breaks Chrome developer tools console message)
 *    This is still experimental! TODO: get coloring to work, without breaking DevTools
 *    TODO: test in front-end, browser.
 *
 * @param options {object} - options and settings
 * @param options.logToCloud {object} - an object of {key:value{function},} pairs
 *    Ex: {log:function(){}, info:function(){}, etc}
 *    Tested, and works well with LogDNA. `options.logToCloud = logdna.createLogger()`
 */
const cconsoleInit = function(options) {
  // optionally, pass log-To-Cloud versions of each log action (log,info,error,etc.)
  let { logToCloud = {}, useTrace = true, useColor = false } = options
  // so different actions (log/info/debug/etc) can communicate with eachother:
  let sharedContext = {}
  // log
  let cconsole = {
    // custom (colorful) loggers
    log: CConsoleLog.bind({ action: "log", useTrace, useColor, logToCloud: logToCloud.log, sharedContext }),
    info: CConsoleLog.bind({ action: "info", useTrace, useColor, logToCloud: logToCloud.info, sharedContext }),
    debug: CConsoleLog.bind({ action: "debug", useTrace, useColor, logToCloud: logToCloud.debug, sharedContext }),
    warn: CConsoleLog.bind({ action: "warn", useTrace, useColor, logToCloud: logToCloud.warn, sharedContext }),
    error_message: CConsoleLog.bind({ action: "error_message", useTrace, useColor, logToCloud: logToCloud.error, sharedContext }),
    error: CConsoleLog.bind({ action: "error", useTrace, useColor, logToCloud: logToCloud.error, sharedContext }),
    table: CConsoleLog.bind({ action: "table", useTrace, useColor, logToCloud: logToCloud.table, sharedContext }),
    trace: CConsoleLog.bind({ action: "trace", useTrace, useColor, logToCloud: logToCloud.trace, sharedContext }),
    success: CConsoleLog.bind({ action: "success", useTrace, useColor, logToCloud: logToCloud.success, sharedContext }),
    subtle: CConsoleLog.bind({ action: "subtle", useTrace, useColor, logToCloud: logToCloud.subtle, sharedContext }),
    // pass-through (default) loggers (standard)
    clear: console.clear,
    time: console.time,
    timeEnd: console.timeEnd,
    timeLog: console.timeLog,
    assert: console.assert,
    count: console.count,
    countReset: console.countReset,
    dir: console.dir,
    dirxml: console.dirxml,
    group: console.group,
    groupCollapsed: console.groupCollapsed,
    groupEnd: console.groupEnd
  }
  // extra pass-through (default) loggers (non-standard)
  if (console.profile) {
    cconsole.profile = console.profile
  }
  if (console.profileEnd) {
    cconsole.profileEnd = console.profileEnd
  }
  if (console.timeStamp) {
    cconsole.timeStamp = console.timeStamp
  }
  // return console
  return cconsole
}

/*
 * Export cconsole
 */
export default cconsoleInit
