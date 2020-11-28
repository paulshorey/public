// setTimeout(function () {
$(document).ready(function () {
  $(".uuiCarousel").each(function () {
    let $carousel = this
    let $prev = $carousel.find(".prev")
    let $next = $carousel.find(".next")
    let $images = $carousel.find(".images")
    $next.click(function () {
      setTimeout(function () {
        $prev.css("opacity", "1")
        $prev.css("visibility", "visible")
      }, 500)
      $images.animate(
        {
          scrollLeft: $images.scrollLeft() + $images.width()
        },
        500,
        "linear"
      )
    })
    $prev.click(function () {
      $images.animate(
        {
          scrollLeft: $images.scrollLeft() - $images.width()
        },
        500,
        "linear"
      )
    })
  })
})
// }, 3000)
