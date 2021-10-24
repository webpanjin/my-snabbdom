
import h from './mySnabbdom/h.js'
import patch from './mySnabbdom/patch'

const myVnode1 = h('ul',{},[
  h('li',{key:'A'},'liA'),
  h('li',{key:'B'},'liB'),
  h('li',{key:'C'},'liC'),
])
const app = document.getElementById('app')
patch(app,myVnode1)

const myVnode2 = h('ul',{},[
  h('li',{key:'C'},'liC'),
  h('li',{key:'B'},'liB'),
  h('li',{key:'D'},'D'),
  h('li',{key:'A'},'liAaa'),
  
])
document.getElementById('btn').onclick = function(){
  patch(myVnode1,myVnode2)
}
