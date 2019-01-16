import Router from 'vue-router'

import Home from './components/Home.vue'
import Account from './components/Account.vue'

import log from './middleware/log'
import auth from './middleware/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {}
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      middleware: [log, auth]
    }
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    const context = {
      to,
      from,
      router,
      next
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({
      ...context,
      next: nextMiddleware
    })
  }
  next()
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) {
    return context.next // no more middlewares, return genuine next()
  } else {
    return () => {
      context.next()
      const nextMiddleware = nextFactory(context, middleware, index + 1)
      subsequentMiddleware({ ...context, next: nextMiddleware })
    }
  }
}

export default router
