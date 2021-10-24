import{
  init,
  h,
  //1.导入模块
  styleModule,
  eventListenersModule,
} from "snabbdom";
//2.注册模块
const patch = init([
  styleModule,
  eventListenersModule
])
//3.使用h()函数的第二个参数传入模块中使用的数据(对象)
let vnode = h('div',[
  h('h1',{style:{backgroundColor:'red'}},'hello world'),
  h('p',{on:{click:eventHandler}},'hello p')
])
function eventHandler(){
  console.log('点我')
}
let app = document.querySelector('#app')
console.log(vnode)
patch(app,vnode)