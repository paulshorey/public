// custom typefaces
// import "typeface-quick"
// import "typeface-merriweather"
import "typeface-quicksand"

// import "prismjs/themes/prism.css"
import "antd/dist/antd.css"
import "src/style/variables.scss"
import "src/style/reset.scss"
import "src/style/responsive.scss"
import "src/style/antd.scss"
import "src/style/ui.scss"
import "src/style/classes.scss"
import "src/style/layout.scss"
import "src/style/loading.scss"

import wrapWithProvider from "./wrap-with-provider"

export const wrapRootElement = wrapWithProvider

// export const createPages = ({ actions }) => {
//   const { createRedirect } = actions
//   createRedirect({ fromPath: '/domains', toPath: '/domain', isPermanent: true })
//   createRedirect({ fromPath: '/', toPath: '/domain', isPermanent: false })
// }
