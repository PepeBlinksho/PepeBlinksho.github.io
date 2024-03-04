console.log('HELLO!')
const createDom = () => {
  const e = document.createElement('div');
  e.id = 'relation-widget'
  console.log(e)
  const body = document.querySelector('body')
  console.log(body)
  body.appendChild(e)
}

const main = () => {
  createDom()
}

main()