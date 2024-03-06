// とりあえず動かす用
function addScript(src, attr) {
  var e = document.createElement('script');
  e.src = src;
  if (attr) {for (var i in attr) {e.setAttribute(i, attr[i]);}}

  var f = function() {
      var bodyElm = document.getElementsByTagName('body').item(0);
      if (bodyElm) {
          bodyElm.appendChild(e);
      } else {
          window.setTimeout(f, 100);
      }
  };
  f();
}

function createStyle(sr) {
  var ca = document.createElement('link')
  ,ss = document.getElementsByTagName('head')[0];
  ca.setAttribute('rel','stylesheet');
  ca.href = sr;
  ss.appendChild(ca);
}

addScript('https://pepeblinksho.github.io/app.js?v=' + parseInt(new Date().getTime() / (900*1000)))
// setTimeout(() => {
  // vue
  // addScript('https://pepeblinksho.github.io/dist/assets/index-Dj4e1_Wx.js')
  // react
  // addScript('https://pepeblinksho.github.io/dist2/assets/index-CbEHUSiq.js')
  // svelte
  addScript('https://pepeblinksho.github.io/dist3/svelte-project.iife.js')
// }, 10000)

createStyle('https://pepeblinksho.github.io/dist3/style.css')