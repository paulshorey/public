window.openModal = function (el, {width}) {
  let mo_size = width || Math.min(window.innerWidth, window.innerHeight) + 13 * 2
  let moo = document.getElementById("openModal_overlay")
  let mo = document.getElementById("openModal")
  if (width) {
    mo.style
  }
  mo.innerHTML = el.outerHTML
  mo.style.mo_top = ((window.innerHeight - $(mo).height()) / 2) * 0.85 + "px"
  mo.style.display = "block"
  moo.style.display = "block"
}
window.closeModal = function () {
  let moo = document.getElementById("openModal_overlay")
  let mo = document.getElementById("openModal")
  mo.style.display = "none"
  moo.style.display = "none"
}

{
  let mo_size = Math.min(window.innerWidth, window.innerHeight) + 13 * 2
  let mo_left = (window.innerWidth - mo_size) / 2
  let mo_top = (window.innerHeight - mo_size) / 2

  let moo = document.createElement("div")
  moo.id = "openModal_overlay"
  moo.addEventListener("click", window.closeModal)
  document.body.appendChild(moo)

  let mo = document.createElement("div")
  mo.id = "openModal"
  mo.style.width = mo_size + "px"
  mo.style.maxHeight = mo_size + "px"
  mo.style.mo_top = mo_top + "px"
  mo.style.mo_left = mo_left + "px"
  document.body.appendChild(mo)
}
