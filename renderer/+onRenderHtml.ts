// https://vike.dev/onRenderHtml
export { onRenderHtml }
export { onBeforeRender }

import { renderToNodeStream } from '@vue/server-renderer'
// import { requestUrl, url, mobile, tablet } from '#root/helpers/url'
import { render as abortRender, redirect } from 'vike/abort'
import type { PageContextClient } from 'vike/types'
import type { App } from 'vue'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { createApp } from './app'
import logoUrl from './logo.svg'
import type { OnRenderHtmlAsync } from 'vike/types'
import { getPageTitle } from './getPageTitle'
export const passToClient = ['initialStoreState', 'routeParams', 'isClientSideNavigation']

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  // This onRenderHtml() hook only supports SSR, see https://vike.dev/render-modes for how to modify
  // onRenderHtml() to support SPA
  if (!pageContext.Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const { stream } = pageContext

  // https://vike.dev/head
  const title = getPageTitle(pageContext)
  const desc = pageContext.data?.description || pageContext.config.description || 'Demo of using Vike'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <style>
          :root {--v-border-opacity: 0.12;--v-hover-opacity: 0.84;}
        </style>
        __VITE_PLUGIN_SSR__ASSETS_FIRST__
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add custom pageContext properties here, see https://vike.dev/pageContext#custom
    }
  }
}

async function onBeforeRender(pageContext: PageContextClient) {

  const { app, store } = createApp(pageContext)
  const stream = renderToNodeStream(app)

  if (!pageContext.isClientSideNavigation && !pageContext.is404) {
  }

  const initialStoreState = store.state.value

  return {
    pageContext: {
      initialStoreState,
      stream,
      routeParams: pageContext.routeParams,
    },
  }
}
