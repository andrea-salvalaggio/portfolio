import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faFaceFrown } from '@fortawesome/free-solid-svg-icons'
import {
  faBootstrap,
  faCss3Alt,
  faGithub,
  faHtml5,
  faInstagram,
  faJs,
  faLaravel,
  faLinkedinIn,
  faPhp,
  faSass,
  faVuejs
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faEnvelope, faFaceFrown,
  faBootstrap, faCss3Alt, faGithub, faHtml5, faInstagram, faJs, faLaravel, faLinkedinIn, faPhp, faSass, faVuejs
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
