import createElement from "./createElement.js";
import updateChildren from "./updateChildren.js";
export default function patchVnode(oldVnode,newVnode){
  //判断新旧vnode是否是同一个对象
  if(oldVnode===newVnode)return 
  //判断新vnode有没text属性
  if(newVnode.text!=undefined&&(newVnode.children===undefined||newVnode.children.length===0)){
    //新vnode有text属性
    if(newVnode.text!=oldVnode.text){
      //如果新虚拟节点中的text和老的虚拟节点中的text不同，直接让新的text写入老的elm中即可。如果老的elm中是children,则会立即消失
      oldVnode.elm.innerText = newVnode.text 
    }
  }else{  
    //新vnode没有text属性
    //判断老的有没有children
    if(oldVnode.children!=undefined&&oldVnode.children.length>0){
      //老的有children,此时就是最复杂的情况，新老都有children
      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
    }else{
      //老的没有children,新的有children
      //清空老的节点的内容
      oldVnode.elm.innerText = ''
      //遍历新的vnode的子节点，创建DOM上树
      newVnode.children.forEach((item,index)=>{
        let dom = createElement(item)
        oldVnode.elm.appendChild(dom)
      })
    }
  }
}