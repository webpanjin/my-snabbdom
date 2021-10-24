import{
  init,
  h,
} from "snabbdom";
const patch = init([])
let vnode = h('div#cocntainer',[
  h('h1','hello snabbdom'),
  h('p','这是p元素')
])
let app = document.querySelector('#app')
let oldVnode = patch(app,vnode)

//模拟从服务器请求数据后更新
setTimeout(()=>{
  // vnode = h('div#container',[
  //   h('h1','hello h1'),
  //   h('p','hello p')
  // ])
  // patch(oldVnode,vnode)

  //清空div中的内容
  patch(oldVnode,h('!'))//创建空的注释节点
},2000)