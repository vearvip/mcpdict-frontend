import { createEffect, ParentComponent } from 'solid-js'
import  './index.less'

interface DrawerProps {
  visable: Boolean
  onClose: () => void
}

const Drawer: ParentComponent<DrawerProps> = (props) => { 
  let drawerBoxDOM: any
  let drawerMaskDOM: any

  const openDrawer = () => { 
    drawerBoxDOM.style.left = '0px'
    drawerMaskDOM.style.opacity = '1'
    drawerMaskDOM.style.zIndex = '998'

  }

  
  const closeDrawer = () => {  
    drawerBoxDOM.style.left = '-240px'
    drawerMaskDOM.style.opacity = '0'
    drawerMaskDOM.style.zIndex = '-999'
  }

  createEffect(() => {
    if (props.visable) {
      openDrawer()
    } else {
      closeDrawer()
    }
  })

  return <>
    <div ref={drawerBoxDOM} id="drawer_box">
      {props.children}
    </div>
    <div ref={drawerMaskDOM} id="drawer_mask" onClick={() => props.onClose()} />
  </>
}

export default Drawer