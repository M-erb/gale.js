import Siema from 'siema'
import { $u } from './dom-utils'

export default function (config) {

  // Get total num of slides
  // This is at top to get an acurate num
  // as Siema adds copies of slides for
  // slide effects
  const slides = $u.getEls(config.slidesSelector)

  if (slides.length) {
    const slider = new Siema({
      selector: config.slideWrapSelector,
      draggable: true,
      loop: true,
      duration: 500,
      perPage: 1,
      easing: 'cubic-bezier(.2,.47,.32,1.24)'
    })

    // Prev and Next btns
    const prevBtns = $u.getEls(config.prevSelector)
    for (let i = 0; i < prevBtns.length; i++) {
      const btn = prevBtns[i]
      btn.addEventListener('click', e => {
        e.preventDefault()
        slider.prev()
      })
    }
    const nextBtns = $u.getEls(config.nextSelector)
    for (let i = 0; i < nextBtns.length; i++) {
      const btn = nextBtns[i]
      btn.addEventListener('click', e => {
        e.preventDefault()
        slider.next()
      })
    }

    // Jump to btns/ dots
    const jumpToEl = $u.getEl(config.jumpToWrapSelector)
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i]
      const btn = document.createElement('button')
      btn.classList.add('dot')
      btn.addEventListener('click', e => {
        slider.goTo(i)
      })
      jumpToEl.appendChild(btn)
    }
  }

}
