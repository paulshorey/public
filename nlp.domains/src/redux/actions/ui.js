export function RX__focusSelectTld() {
  return {
    type: "RX__focusSelectTld"
  }
}

export function RX__toggle_poss(value = undefined) {
  return (dispatch) => {
    dispatch({
      type: "RX__toggle_poss",
      data: value
    })
  }
}

export function RX__search_title(title) {
  return {
    type: "RX__search_title",
    data: title
  }
}

export function RX__toast(intent, message) {
  // IF BOTH ARGUMENTS PROVIDED:
  if (intent && message) {
    // remap intent
    switch (intent) {
      case "error":
        intent = "danger"
        break
      case "fail":
        intent = "warning"
        break
      default:
        intent = "success"
        break
    }
    // display second argument
    return {
      type: "RX__toast",
      intent: intent,
      message: message
    }
  }
  // OPTIONALLY, USE WITH ONLY ONE ARGUMENT:
  if (intent && !message) {
    // display first argument instead of second
    return {
      type: "RX__toast",
      intent: "",
      message: intent
    }
  }
}
