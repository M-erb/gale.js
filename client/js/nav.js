import { $u } from './dom-utils'

export default function() {
  const mobiBtns = $u.getEls('.mobi_btn_js')

  if (mobiBtns.length) {
    const body = $u.getEl('body')
    function noScrollTogg() {
      body.classList.toggle('overflow-hidden')
    }

    const mobiMenu = $u.getEl('.mobi_menu')

    mobiBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault()

        noScrollTogg()
        mobiMenu.classList.toggle('open')
      })
    })
  }
}
