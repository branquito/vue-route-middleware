export default function log({ next }) {
  console.warn('now in logger middleware')

  console.log('next is: ', next)
  return next()
}
