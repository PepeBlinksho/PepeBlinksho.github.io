console.log('HELLO!')
const createDom = () => {
  const e = document.createElement('div');
  e.id = 'relation-widget'
  console.log(e)
  const body = document.querySelector('body')
  console.log(body)
  body.appendChild(e)
  let relationData = localStorage.getItem("messageWindow/call");
  console.log(relationData)

  localStorage.setItem('test000000000000', 'ABC123');
  let widgetData = localStorage.getItem("test000000000000");
  console.log(widgetData)
}

const main = () => {
  createDom()
}

main()