console.log('HELLO!')
const createDom = () => {
  const e = document.createElement('div');
  e.id = 'relation-widget'
  const body = document.querySelector('body')
  body.appendChild(e)
}

const main = () => {
  createDom()
}