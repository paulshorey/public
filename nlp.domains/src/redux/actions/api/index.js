import * as thirdparty from "src/redux/actions/api/thirdparty"
import * as domain from "./data_domain"
import * as word from "./data_word"

export default { ...thirdparty, ...domain, ...word }
