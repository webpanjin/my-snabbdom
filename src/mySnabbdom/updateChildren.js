import patchVnode from "./patchVnode"
import createElement from "./createElement"
//判断是否是同一个虚拟节点
function checkSameVnode(a,b){
  return a.sel===b.sel&&a.key===b.key
}
export default function updateChildren(parentElm,oldCh,newCh){
  //旧前
  let oldStartIndex = 0
  //新前
  let newStartIndex = 0 
  // 旧后
  let oldEndIndex = oldCh.length-1
  // 新后
  let newEndIndex = newCh.length-1
  //旧前节点
  let oldStartVnode = oldCh[0]
  //旧后节点
  let oldEndVnode = oldCh[oldEndIndex]
  //新前节点
  let newStartVnode = newCh[0]
  //新后节点
  let newEndVnode = newCh[newEndIndex]
  let keyMap = {}
  while(oldStartIndex<=oldEndIndex&&newStartIndex<=newEndIndex){
    //首先略过已经加undefined标记的位置
    if(oldStartVnode==null||oldCh[oldStartIndex]===undefined){
      oldStartVnode = oldCh[++oldStartIndex]
    }else if(oldEndVnode==null||oldCh[oldEndIndex]===undefined){
      oldEndVnode = oldCh[--oldEndIndex]
    }else if(newStartVnode==null||newCh[newStartIndex]===undefined){
      newStartVnode = newCh[++newStartIndex]
    }else if(newEndVnode==null||newCh[newEndIndex]===undefined){
      newEndVnode = newCh[--newEndIndex]
    }else if(checkSameVnode(oldStartVnode,newStartVnode)){//新前与旧前
      console.log('命中①旧前与新前')
      patchVnode(oldStartVnode,newStartVnode)
      oldStartVnode = oldCh[++oldStartIndex]
      newStartVnode = newCh[++newStartIndex]
    }else if(checkSameVnode(oldEndVnode,newEndVnode)){//新后与旧后
      console.log('命中②旧后与新后')
      patchVnode(oldEndVnode,newEndVnode)
      oldEndVnode = oldCh[--oldEndIndex]
      newEndVnode = newCh[--newEndVnode]
    }else if(checkSameVnode(oldStartVnode,newEndVnode)){//新后于旧前
      console.log('命中③新后于旧前')
      patchVnode(oldStartVnode,newEndVnode)
      //当③新后于旧前命中的时候，要移动节点，移动新后指向的这个节点到老节点的旧后后面
      parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIndex]
      newEndVnode = newCh[--newEndIndex]
    }else if(checkSameVnode(oldEndVnode,newStartVnode)){//新前于旧后
      console.log('命中④新前于旧后')
      patchVnode(oldEndVnode,newStartVnode)
      //当④新前于旧后命中时，此时要移动新前指向的这个节点到老节点的旧前前面
      parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIndex]
      newStartVnode = newCh[++newStartIndex]
    }else{
      //四种都没命中
      if(!keyMap){
        keyMap = {}
        //从oldStartIndex开始，到oldEndIndex结束，创建keyMap映射对象
        for(let i=oldStartIndex;i<=oldEndIndex;i++){
          const key = oldCh[i].key 
          if(key!=undefined){
            keyMap[key] = i
          }
        }
      }
      //寻找当前(newStartIndex)这项在keyMap中映射的位置序号
      const indexInOld = keyMap[newStartVnode.key]
      if(indexInOld===undefined){
        //判断如果indexInOld是undefined表示它是全新的项
        parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
      }else{
        //如果不是undefined表示要移动
        const elmToMove = oldCh[indexInOld]
        patchVnode(elmToMove,newStartVnode)
        //把这项设置为undefined,表示已经处理完这项了
        oldCh[indexInOld] = undefined
        //移动，调用insertBefore也可实现移动
        parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm)
      }
      //指针下移，只移新的头
      newStartVnode = newCh[++newStartIndex]
    }
  }
  //继续看有没有剩余的，循环结束了start还是比old小
  if(newStartIndex<=newEndIndex){
    console.log('new还有剩余节点没处理，要加项.把所有剩余节点插入到oldStartIndex之前')
    // 遍历新的newCh,添加到老的没有处理的之前
    for(let i=newStartIndex;i<newEndIndex;i++){
      //insertBefore方法可以自动识别null,如果是null就会自动排到队尾，和appendChild是一致的
      // newCh[i]现在还没有真正的DOM,所以调用createElement()函数变成DOM
      parentElm.insertBefore(createElement(newCh[i]),oldCh[oldStartIndex].elm)
    }
  }else if(oldStartIndex<=oldEndIndex){
    console.log('old还有剩余结点没处理，要删项')
    //删除oldStart和oldEnd指针之间的项
    for(let i=oldStartIndex;i<=oldEndIndex;i++){
      if(oldCh[i]){
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}