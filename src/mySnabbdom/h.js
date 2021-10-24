import vnode from './vnode'
//编写一个低配版的h函数，这个函数必须接收三个参数
//只完成h函数的核心功能，不考虑细枝末节
//对比原版的重载功能是较弱的
export default function(sel,data,c){//第三个参数可能是文字/数组/h函数
  //形态① h('div',{},'文字')
  //形态② h('div',{},[])
  //形态③ h('div',{},h())
  //检查参数的个数
  if(arguments.length!=3){
    throw new Error('h函数传入的参数必须为3个参数')
  }
  //检查参数c的类型
  if(typeof c==='string' || typeof c==='number'){
    //说明现在调用h函数是形态①
    return vnode(sel,data,undefined,c,undefined)
  }else if(Array.isArray(c)){
    let children = []
    //说明现在调用h函数是形态②
    for(let i=0;i<c.length;i++){
      //检查c[i]必须是一个对象
      if(!typeof c[i]==='object'&&c[i].hasOwnProperty('sel')) throw new Error('传入数组的参数有的项不是h函数')
      //这里不用执行c[i],因为测试语句中已经有了执行
      //此时只需要收集好就行了
      children.push(c[i])
    }
    return vnode(sel,data,children,undefined,undefined)//不考虑更深层的嵌套
  }else if(typeof c==='object'&&c.hasOwnProperty('sel')){
    //说明现在调用h函数是形态③
    //即传入的c是唯一的children
    let children = [c]
    return vnode(sel,data,children,undefined,undefined)//不考虑更深层的嵌套
  }else{
    throw new Error('传入的第三个参数类型不对')
  }
}