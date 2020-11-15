import destroyCircular from "./destroyCircular"
import serializeError from "./serializeError"

// use "browser" colors if in browser
let NODEJSCOLORS = typeof window !== "object"
// also use "browser" colors if in NodeJS with "--inspect" or "--inspect-brk" flag
if (NODEJSCOLORS && process.execArgv.join().includes("--inspect")) {
  NODEJSCOLORS = false
}

/*
 * Log to console
 */
export default function () {
  let args = [...arguments]

  /*
   * optional:
   * trace file:line, where log originated
   */
  let trace = ""
  if (this.useTrace) {
    let stack = []
    let err = new Error()
    if (err.stack) {
      stack = err.stack.split("\n")
      if (stack[2]) {
        // determine file:line which called this console log
        let str = stack[2]
        let i_end = str.lastIndexOf(":")
        let i_start_before = str.lastIndexOf("/", i_end - 20) + 1
        trace = `(${str.substring(i_start_before, i_end)})`
      }
    }
  }

  /*
   * optimize message view
   */
  let hasError = false
  let a = 0
  let a_is_string = []
  while (a < args.length) {
    // if first argument is string, give it a colon ": "
    if (a === 0 && typeof args[a] === "string") {
      if (args.length > a + 1) {
        args[a] += ": "
      } else {
        args[a] += " "
      }
    }

    // fix object from being printed as "[object Object]"
    if (typeof args[a] === "object") {
      if (args[a] instanceof Error) {
        // error object
        hasError = true
        try {
          // going to assume this is an Error
          args[a] = serializeError(args[a])
          if (typeof args[a] === "object") {
            args[a] = serializeError(args[a].stack)
          }
        } catch (e) {}
      } else {
        // regular object
        // serialize so it does not display changes made after log has printed
        args[a] = JSON.parse(JSON.stringify(destroyCircular(args[a], [])))
      }
    }

    // consolidate simple types into one, if color1ed,
    // so all messages will be displayed in color1
    // else if (
    //   color1 &&
    //   (typeof args[a] === "string" ||
    //     typeof args[a] === "number" ||
    //     typeof args[a] === "boolean" ||
    //     typeof args[a] === "undefined")
    // ) {
    //   // remember this if check for next time
    //   a_is_string[a] = true
    //   // check previous, if same type
    //   if (a_is_string[a - 1]) {
    //     // consolidate current into previous value
    //     args[a - 1] += ", " + args[a]
    //     // delete current
    //     args.splice(a, 1)
    //     a--
    //   }
    // }
    // next
    a++
  }

  /*
   * error - prepare message for output as string
   */
  let error_message = ''
  if (this.action==='error_message') {
    args[0] = error_message = (args[0] && typeof args[0] === 'string') ? args[0].split('\n').slice(0,2).map(str=>str.replace(/\/.+\//g,'')).toString() : 'error'
    this.action = 'error'
  }

  /*
   * color1 messages
   *
   * on NODE JS
   * https://en.wikipedia.org/wiki/ANSI_escape_code#Colors <- use "FG Code" for text, "BG Code" for background
   *
   * \x1b[41m     \x1b[33m       %s        \x1b[0m
   * red bg       yellow text    string    escape for next line
   *
   * \x1b[47m           \x1b[30m       %s        \x1b[0m
   * light grey bg      black text     string    escape for next line
   */
  let action = this.action
  let color1 = ""
  let color2 = ""
  if (this.useColor && typeof args[0] === "string") {
    /*
     * color for CLI / Terminal
     */
    if (NODEJSCOLORS) {
      switch (this.action) {
        case "error":
          color1 = "\x1b[41m\x1b[33m%s\x1b[0m"
          break
        case "warn":
          color1 = "\x1b[43m\x1b[30m%s\x1b[0m"
          break
        case "info":
          color1 = "\x1b[46m\x1b[30m%s\x1b[0m"
          break
        case "debug":
          color1 = "\x1b[45m\x1b[30m%s\x1b[0m"
          break
        case "trace":
          color1 = "\x1b[106m\x1b[30m%s\x1b[0m"
          break
        case "success":
          color1 = "\x1b[42m\x1b[30m%s\x1b[0m"
          this.action = "log"
          break
        case "subtle":
          color1 = "\x1b[40m\x1b[90m%s\x1b[0m"
          this.action = "log"
          break
      }
    } else {
      /*
       * color for browser devtools
       */
      switch (action) {
        case "error":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "background:red; color:yellow")
          break
        case "warn":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "background:yellow; color:black")
          break
        case "info":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "background:teal; color:black")
          break
        case "debug":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "background:magenta; color:black")
          break
        case "trace":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "background:cyan; color:black")
          break
        case "success":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "background:lawngreen; color:black")
          break
        case "subtle":
          args[0] = "%c" + args[0]
          args.splice(1, 0, "color:grey")
          break
      }
    }
  }

  /*
   * custom actions
   */
  switch (action) {
    case "success":
      action = "log"
      break
    case "subtle":
      action = "log"
      break
  }

  /*
   * Log message to console
   * use specified action (log, info, debug, warn, etc)
   */
  if (action + this.action !== this.sharedContext.last_action) {
    console.log("")
  }
  // log color
  if (color1) {
    if (trace) {
      // color1, trace
      args = [color1, ...args, trace, color2]
    } else {
      // color1, no trace
      args = [color1, ...args, color2]
    }
  } else if (trace) {
    // no color1, trace
    args = [...args, trace]
  } else {
    // no color1, no trace
    args = [...args]
  }
  // log content
  console[action](...args)

  /*
   * Log original content to cloud
   */
  if (this.logToCloud) {
    this.logToCloud(...arguments, trace)
  }

  /*
   * Add linebreak when different actions back to back
   * but no linebreak when same action
   */
  this.sharedContext.last_action = action + this.action

  /*
   * return
   */
  if (error_message) {
    return error_message
  }
}
