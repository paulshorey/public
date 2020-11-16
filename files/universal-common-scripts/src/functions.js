/**
 * Anonymous function wrapper - more reliable than ;(()=>{ ... })()
 *    Probem is anonymous function sometimes fails silently, even in try/catch !
 *    This try/catch implementation is more reliable.
 *    Also, don't need leading semicolon, if you're into not using semicolons.
 * @param tryCode
 * @param catchAction
 */
export const anonFunction = (tryCode, catchAction) => {
  try {
    // hopefully it works:
    tryCode()
  } catch (err) {
    // something broke!
    cconsole ? cconsole.error(err) : console.error(err)
    // stop and inspect
    if (catchAction === "exit" && typeof process !== "undefined") {
      // exit
      process.exit()
    } else {
      // debug
      debugger
    }
  }
}
