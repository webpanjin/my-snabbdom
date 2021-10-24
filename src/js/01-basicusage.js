import{
  init,
  h,
} from "snabbdom";

const patch = init([])

//第一个参数：标签+选择器
//第二个参数：如果是字符串就是标签中的文本内容
let vnode = h('div#container.cls',
{hook:{
  init(vnode){
    console.log(vnode.elm)
  },
  create(emptyNode,vnode){
    console.log(vnode.elm)
  }
}},
'Hello World')
let app = document.querySelector('#app')
//第一个参数：旧的VNode,可以是DOM元素
//第二个参数：新的VNode
//返回新的VNode (patch返回的新的VNode又会称为下一次执行的老的VNode)
let oldVnode = patch(app,vnode)
vnode = h('div#container.xxx','hello shenm')
patch(oldVnode,vnode)
