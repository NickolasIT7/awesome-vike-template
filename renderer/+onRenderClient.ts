// https://vike.dev/onRenderClient
export { onRenderClient }

import { createApp } from './app'
import { getPageTitle } from './getPageTitle'
import type { OnRenderClientAsync } from 'vike/types'
import type { PageContextClient } from 'vike/types'
import { registerPlugins } from '#root/plugins'

let app: ReturnType<typeof createApp>['app']
const onRenderClient: OnRenderClientAsync = async (pageContext: PageContextClient): ReturnType<OnRenderClientAsync> => {
  // This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
  // to support SPA
  if (!pageContext.Page) throw new Error('My onRenderClient() hook expects pageContext.Page to be defined')

  if (!app) {
    const instance = createApp(pageContext)
    app = instance.app
    registerPlugins()
    instance.store.state.value = pageContext.initialStoreState
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
  document.title = getPageTitle(pageContext)
}
