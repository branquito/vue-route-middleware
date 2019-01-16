export default function log({ next, router }) {
  console.warn('now in auth middleware')
  // if (true) {
  //   router.push({ name: 'home' })
  // }
  return next()
}
