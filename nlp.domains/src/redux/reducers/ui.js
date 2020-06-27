import { message } from "antd"

/*
  1) CONFIG - DEFAULT STATE:
*/
const defaultState = {
  show_poss: false,
  search_title: "initial title...",
  // incrementing this var will open the domain extensions dropdown
  focusSelectTld: 0 // will watch for change in componentDidUpdate. So, only need to increment, not manage true/false state
}

/*
  2) REDUCE STATE:
*/
const ThisReducer = (state = defaultState, action) => {
  const newState = { ...state }

  /*
    3) HANDLE ACTIONS:
  */
  switch (action.type) {
    case "RX__focusSelectTld":
      // will watch for change in componentDidUpdate. So, only need to increment, not manage true/false state
      newState.focusSelectTld++
      break

    case "RX__toggle_poss":
      if (typeof action.data === "boolean") {
        newState.show_poss = action.data
      } else {
        newState.show_poss = !newState.show_poss
      }
      break

    case "RX__search_title":
      newState.search_title = action.data
      break

    case "RX__toast":
      // this is a non-standard hack - needs refactor:
      // but it does work very well as is!!! :D
      message[action.intent || "success"](action.message)
      break

    default:
      break
  }

  /*
    4) RETURN (COPY OF) STATE:
  */
  return newState
}

export default ThisReducer
