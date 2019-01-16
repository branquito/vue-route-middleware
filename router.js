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
      middleware: [log, auth, log]
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
  if (!middleware[index]) {
    return context.next // no more middlewares, return genuine next()
  } else {
    const subsequentMiddleware = nextFactory(context, middleware, index + 1)
    console.log('subs', subsequentMiddleware)
    // context.next()

    return () => {
      console.log('I am fake next()')
      context.next() // genuine next()
    }
  }
}

export default router
