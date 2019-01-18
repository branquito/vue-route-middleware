export default function log({ next, router }) {
  console.warn('now in auth middleware')
  if (!window.localStorage.getItem('jwt')) {
    return router.push({ name: 'home' })
  }
  return next()
}
