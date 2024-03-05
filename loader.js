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

addScript('https://pepeblinksho.github.io/app.js?v=' + parseInt(new Date().getTime() / (900*1000)))
// addScript('https://pepeblinksho.github.io/dist/assets/index-Dj4e1_Wx.js')
addScript('https://pepeblinksho.github.io/dist2/assets/index-CbEHUSiq.js')