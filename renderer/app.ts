export { createApp }

import { createSSRApp, defineComponent, h, markRaw, reactive } from 'vue'
import PageShell from './PageShell.vue'
import type { Component } from './types'
import { setPageContext } from './usePageContext'
import type { PageContext } from 'vike/types'

import vuetify from '#root/plugins/vuetify'
import { createPinia } from 'pinia'
import { LazyHydrationWrapper } from 'vue3-lazy-hydration'

function createApp(pageContext: PageContext) {
  const { Page } = pageContext

  let rootComponent: Component & { Page: Component }
  const PageWithShell = defineComponent({
    data: () => ({
      Page: markRaw(Page)
    }),
    created() {
      rootComponent = this
    },
    render() {
      return h(
        PageShell,
        {},
        {
          default: () => {
            return h(this.Page)
          }
        }
      )
    }
  })

  const app = createSSRApp(PageWithShell)
  const store = createPinia()
  app.component('LazyHydrate', LazyHydrationWrapper)
  app.use(store).use(vuetify)
  // We use `app.changePage()` to do Client Routing, see `+onRenderClient.ts`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext)
      rootComponent.Page = markRaw(pageContext.Page)
    }
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `+onRenderClient.ts`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)

  // Make pageContext available from any Vue component
  setPageContext(app, pageContextReactive)

  return { app, store }
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj extends object, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}
