/**
 * USAGE:
 * Use specific HTML structure. Then simply include this script into your HTML <head> or <body>.
 * It will convert your HTML into a dynamic slideshow. Works best with static webpages.
 * It works with apps like React also, including in development environment, but...
 *    only if you navigate to the page statically `<a href="...`,
 *    will not work when using the app framework's router `<Link to="...`
 */
;(function () {
  /**
   * DEBOUNCE (just like lodash/underscore)
   *    Instead of relying on 3rd party libraries, copy function here.
   * @param {function} callback - the function to throttle
   * @param {number} wait - how many milliseconds to wait between executions
   */
  function debounce(callback, wait) {
    let timeout = null
    return function () {
      const callNow = !timeout
      const next = function () {
        return callback(arguments)
      }
      clearTimeout(timeout)
      timeout = setTimeout(next, wait)
      if (callNow) {
        next()
      }
    }
  }

  /**
   * ON DOCUMENT READY (not so fast!)
   *    This may seem janky, and it is, but it cancels itself after finished or not needed.
   */
  const CHECK_TOTAL_MS = 6000 // how long to wait for element to appear and images to be ready
  const CHECK_EVERY_MS = 300 // check every so often
  let clear_interval = setInterval(check_if_carousels_loaded, CHECK_EVERY_MS)
  let count_intervals = 0

  /**
   * Wait for the carousel elements to load on page.
   *    Then wait for the images to be loaded.
   *    Only then start the script.
   *    Because - this is a flexible carousel, relies on dynamic img width.
   */
  function check_if_carousels_loaded() {
    let carousels = document.querySelectorAll(".horizontal_carousel")
    if (carousels && carousels.length) {
      /*
       * DOM has loaded! Now, wait for the images to load.
       */
      let last_carousel = carousels[carousels.length - 1]
      if (last_carousel) {
        let images = last_carousel.querySelectorAll("img")
        if (images && images.length) {
          /*
           * Find last image in last carousel - wait for it to finish loading.
           */
          let last_image = images[images.length - 1]
          if (last_image && last_image.complete) {
            /*
             * Image is done loading - now it's OK to start the carousel
             */
            init_carousels()
          } else {
            /*
             * KEEP WAITING - images must be loaded, so script can check the inner scrollWidth of the carousel
             */
            return
          }
        } else {
          /*
           * NO IMAGES - only HTML - fire up that carousel immediately!
           */
          init_carousels()
        }
      }
    }
    /*
     * Give the browser a rest
     */
    count_intervals++
    if (count_intervals > CHECK_TOTAL_MS / CHECK_EVERY_MS) {
      // tried too many times, give up! Stop checking
      clearInterval(clear_interval)
    }
  }

  /**
   * INITIATE THE CAROUSELS
   *    Run script to bring the carousel to life
   */
  function init_carousels() {
    // stop checking
    clearInterval(clear_interval)
    // load
    for (let carousel of document.querySelectorAll(".horizontal_carousel")) {
      // add arrows if not exist
      let arrows = carousel.querySelector(".arrows")
      if (!arrows) {
        add_arrows(carousel)
      }
      // fix arrows (show/hide left/right)
      fix_arrows.call({ carousel })
      // dependents
      let prev = carousel.querySelector(".prev")
      let next = carousel.querySelector(".next")
      let images = carousel.querySelector(".slides")
      // prev/next
      next.addEventListener("click", scrollNext)
      prev.addEventListener("click", scrollPrev)
      function scrollNext() {
        // smooth scroll to next frame
        images.scrollBy({ left: images.clientWidth, top: 0, behavior: "smooth" })
        // not sure how long the animation will take:
        setTimeout(fix_arrows.bind({ carousel }), 500)
        setTimeout(fix_arrows.bind({ carousel }), 750)
      }
      function scrollPrev() {
        // smooth scroll to next frame
        images.scrollBy({ left: -images.clientWidth, top: 0, behavior: "smooth" })
        // not sure how long the animation will take:
        setTimeout(fix_arrows.bind({ carousel }), 500)
        setTimeout(fix_arrows.bind({ carousel }), 750)
      }

      /*
       * IMPORTANT: on manual user scroll, fix arrows
       */
      images.addEventListener("scroll", function (e) {
        debounce(fix_arrows.bind({ carousel }), 100)()
      })
      // and on window resize, also fix arrows
      window.addEventListener("resize", function (e) {
        debounce(fix_arrows.bind({ carousel }), 200)()
      })
    }
  }

  /**
   * ADD ARROW ELEMENTS (prev/next buttons)
   * @param {object} carousel DOM element
   */
  function add_arrows(carousel) {
    let arrows = `
    <div class="arrows">
      <svg class="prev" viewBox="8 8 192 512">
        <defs><filter id="shadow"><feDropShadow dx="5" dy="10" stdDeviation="5" flood-color="black" /></filter></defs>
        <path fill="currentColor" stroke="white" stroke-width="18" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path>
      </svg>
      <svg class="next" viewBox="-8 -8 192 512"
        <defs><filter id="shadow"><feDropShadow dx="5" dy="10" stdDeviation="5" flood-color="black" /></filter></defs>
        <path fill="currentColor" stroke="white" stroke-width="18" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    </div>
    `
    // insert after slides
    let slides = carousel.querySelector(".slides")
    if (!slides) return
    // Mozilla says this does not corrupt existing elements, so should work with React:
    slides.insertAdjacentHTML("afterend", arrows)
  }

  /**
   * "FIX" ARROWS
   *    Hide left/right arrows when scrolled all the way left/right.
   *    NOTE: no parameters, instead MUST BE BOUND TO OPTIONS object `{carousel: }`
   *        include key "carousel" with value being the carousel DOM element to modify
   */
  function fix_arrows() {
    let { carousel } = this
    let prev = carousel.querySelector(".prev")
    let next = carousel.querySelector(".next")
    let slides = carousel.querySelector(".slides")
    let last_slide = carousel.querySelector(".slides > *:last-child")
    if (slides.scrollLeft === 0) {
      /*
       * scrolled all the way left
       */
      prev.style.opacity = 0
      prev.style.visibility = "hidden"
    } else {
      prev.style.opacity = 1
      prev.style.visibility = "visible"
    }
    if (slides.scrollLeft + slides.clientWidth >= slides.scrollWidth - last_slide.clientWidth / 2) {
      /*
       * scrolled all the way right (allow last child to be half cut-off)
       */
      next.style.opacity = 0
      next.style.visibility = "hidden"
    } else {
      next.style.opacity = 1
      next.style.visibility = "visible"
    }
  }
})()
