let url = import.meta.env.VITE_LOCAL ? 'http://localhost:3001' : 'https://api.prod.domain'
const logo = url + '/logo/'
let device = '/img/'
if (!import.meta.env.SSR) {
  if (document.documentElement.clientWidth < 440) {
    device += 'mobile/'
  } else if (document.documentElement.clientWidth > 1024) {
    device += 'desktop/'
  } else {
    device += 'tablet/'
  }
}
device = url + device
const mobile = url + '/img/mobile/'
const tablet = url + '/img/tablet/'
const desktop = url + '/img/desktop/'
const lazy = url + '/img/lazy/'

let clientDevice = '/mobile/'
if (device == desktop) clientDevice = '/desktop/'
if (device == tablet) clientDevice = '/tablet/'
if (device == mobile) clientDevice = '/mobile/'

let clientTabletOrMobile = (device == mobile) ? '/mobile/' : '/tablet/'
let tabletOrMobile = (device == mobile) ? mobile : tablet

export { url, logo, device, lazy, mobile, tablet, tabletOrMobile, desktop, clientDevice, clientTabletOrMobile }