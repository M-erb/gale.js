export const $u = {
  getEl(selector) {
    return document.querySelector(selector)
  },
  getEls(selector) {
    return [...document.querySelectorAll(selector)]
  }
}
