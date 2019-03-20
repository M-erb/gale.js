import { $u } from './dom-utils'

export default function () {
  const toggEls = $u.getEls('.togg_faq_js')

  for (let i = 0; i < toggEls.length; i++) {
    const toggBtn = toggEls[i]
    
    toggBtn.addEventListener('click', e => {
      e.preventDefault()
      const drawer = e.currentTarget.parentElement
      drawer.classList.toggle('active')
    }, false)
  }

}
