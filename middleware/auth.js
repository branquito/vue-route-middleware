export default function log({ next, router }) {
  console.warn('now in auth middleware')
  if (false) {
    console.log('in if block')
    router.push({ name: 'home' })
  }
  return next()
}
