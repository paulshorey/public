function isElementInView(el) {
  let middle = (window.innerHeight || document.documentElement.clientHeight) * (2 / 5)
  let rect = el.getBoundingClientRect()
  if (rect.top < middle && rect.top + el.clientHeight >= middle) {
    return true
  }
}
// setTimeout(function () {
$(document).ready(function () {
  /*
   * SLIDESHOW
   */
  $(".cycle-slideshow").each(function () {
    $(this).cycle()
    $(this)[0].play = function () {
      try {
        $(this).cycle("resume")
      } catch (e) {}
    }
    $(this)[0].pause = function () {
      try {
        $(this).cycle("pause")
      } catch (e) {}
    }
  })

  /*
   * CLICK ANYWHERE INSIDE DIV TO START/STOP VIDEO
   */
  $("video")
    .parent()
    .click(function () {
      if ($(this).find("video").get(0).paused) {
        $(this).find("video").get(0).play()
        $(this).find(".playpause").fadeOut()
      } else {
        $(this).find("video").get(0).pause()
        $(this).find(".playpause").fadeIn()
      }
    })
})

/*
 * VIDEO AUTOPLAY
 */
$(window).on("load, scroll", function () {
  $("[scrollplay]").each(function () {
    if (isElementInView($(this)[0])) {
      if ($(this)[0].play) {
        $(this)[0].play()
      }
    } else {
      if ($(this)[0].pause) {
        $(this)[0].pause()
      }
    }
  })
})
