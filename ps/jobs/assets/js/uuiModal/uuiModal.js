window.uuiModal = function (el, options = {}) {

  let moo = document.getElementById("uuiModal_overlay")
  let mo = document.getElementById("uuiModal")

  mo.innerHTML = el.outerHTML

  mo.style.display = "block"
  moo.style.display = "block"

  let mo_size = Math.min(window.innerWidth, window.innerHeight) + 13 * 2
  let mo_left = (window.innerWidth - mo_size) / 2
  let mo_top = (window.innerHeight - mo_size) / 2
  mo.style.width = mo_size + "px"
  mo.style.maxHeight = mo_size + "px"
  mo.style.mo_top = mo_top + "px"
  mo.style.mo_left = mo_left + "px"

}
window.closeModal = function () {
  let moo = document.getElementById("uuiModal_overlay")
  let mo = document.getElementById("uuiModal")
  mo.style.display = "none"
  moo.style.display = "none"
}

{
  let mo_size = Math.min(window.innerWidth, window.innerHeight) + 13 * 2
  let mo_left = (window.innerWidth - mo_size) / 2
  let mo_top = (window.innerHeight - mo_size) / 2

  let moo = document.createElement("div")
  moo.id = "uuiModal_overlay"
  moo.addEventListener("click", window.closeModal)
  document.body.appendChild(moo)

  let mo = document.createElement("div")
  mo.id = "uuiModal"
  mo.style.width = mo_size + "px"
  mo.style.maxHeight = mo_size + "px"
  mo.style.mo_top = mo_top + "px"
  mo.style.mo_left = mo_left + "px"
  mo.addEventListener("click", window.closeModal)
  document.body.appendChild(mo)
}
