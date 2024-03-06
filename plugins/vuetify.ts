import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import '#root/renderer/css/variables.scss?inline'


import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { createVuetify } from 'vuetify'

export default createVuetify({
  ssr: true,
  theme: {
    variations: false ,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
