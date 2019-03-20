"use strict"

// -------------------
// Styles
// -------------------
import './pcss/styles.pcss'

// -------------------
// Images
// -------------------
import './imgs/icons/pink-ring.png'

// -------------------
// utilities
// -------------------
import { $u } from './js/dom-utils'
window.$u = $u

import nav from './js/nav'
nav()

// Testimony slider
import testimonySlider from './js/slider'
testimonySlider({
  slideWrapSelector: '.testimony_slider_js',
  slidesSelector: '.testimony_slider_js .slide',
  prevSelector: '.prev_testimony_js',
  nextSelector: '.next_testimony_js',
  jumpToWrapSelector: '.testimony_jump_to_js'
})

import drawerInit from './js/faq-drawers'
drawerInit()
