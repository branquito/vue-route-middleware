export default function log({ next }) {
  console.warn('now in logger middleware')
  // Uncomment below to be able to switch to /account
  // window.localStorage.setItem('jwt', 'value')
  return next()
}
