import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cf4e9936 = () => interopDefault(import('../pages/report.vue' /* webpackChunkName: "pages/report" */))
const _54f42bcb = () => interopDefault(import('../pages/report-a-problem.vue' /* webpackChunkName: "pages/report-a-problem" */))
const _5d3912e3 = () => interopDefault(import('../pages/stores.vue' /* webpackChunkName: "pages/stores" */))
const _552225b1 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/report",
    component: _cf4e9936,
    name: "report"
  }, {
    path: "/report-a-problem",
    component: _54f42bcb,
    name: "report-a-problem"
  }, {
    path: "/stores",
    component: _5d3912e3,
    name: "stores"
  }, {
    path: "/",
    component: _552225b1,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
