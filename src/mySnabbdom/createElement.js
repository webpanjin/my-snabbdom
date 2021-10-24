//创建节点,将vnode创建为DOM,插入到pivot元素之前
export default function createElement(vnode){
  let domNode = document.createElement(vnode.sel)
  //有子节点还是文本节点
  if(vnode.text!=''&&(vnode.children===undefined||vnode.children.length===0)){
    //内部是文字
    domNode.innerText = vnode.text
  }else if(Array.isArray(vnode.children)&&vnode.children.length>0){
    vnode.children.forEach((item,index)=>{
      let ch = vnode.children[index]
      let chDom = createElement(ch)
      domNode.appendChild(chDom)
    })
  }
  //补充elm属性
  vnode.elm = domNode
  //返回elm，elm是一个纯DOM对象
  return vnode.elm
}