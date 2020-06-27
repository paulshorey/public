import React from 'react'

import wrapWithProvider from './wrap-with-provider'

export const wrapRootElement = wrapWithProvider

// export const createPages = ({ actions }) => {
//   const { createRedirect } = actions
//   createRedirect({ fromPath: '/domains', toPath: '/domain', isPermanent: true })
//   createRedirect({ fromPath: '/', toPath: '/domain', isPermanent: false })
// }

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPostBodyComponents,
  replacePostBodyComponents,
}) => {
  // const headComponents = getHeadComponents()
  // headComponents.push(
  //   <>
  //   </>,
  // )
  // replaceHeadComponents(headComponents)

  const bodyComponents = getPostBodyComponents()
  bodyComponents.push(
    <>
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1" />
        <div className="sk-cube sk-cube2" />
        <div className="sk-cube sk-cube3" />
        <div className="sk-cube sk-cube4" />
        <div className="sk-cube sk-cube5" />
        <div className="sk-cube sk-cube6" />
        <div className="sk-cube sk-cube7" />
        <div className="sk-cube sk-cube8" />
        <div className="sk-cube sk-cube9" />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `     
          /*
           * Loading Animation - call window.isLoading() to show, then window.doneLoading() to hide
           */
            window.isLoading = function (what, max = 3000) {
              // add loading animation
              window.document.body.classList.add('loading_' + what);
              // auto remove if forgot or errorred
              setTimeout(() => {
                window.document.body.classList.remove('loading_' + what);
              }, max);
            };
            window.doneLoading = function (what) {
              // remove loading animation
              window.document.body.classList.remove('loading_' + what);
            };
            
          
          /*
           * Pause Execution - because Chrome's "pause javascript execution" shortcut is not working!
           */
            window.document.body.addEventListener('keyup', function (event) {
              if (event.key === "F8") {
                debugger;
              }
            }, false);
          `,
        }}
      />
    </>,
  )
  replacePostBodyComponents(bodyComponents)
}
