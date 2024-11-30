import styles from './index.module.less'
import { Component, createSignal, For, JSX, Show } from 'solid-js'
import { MenuConfig } from '@/types'
import menuSvg from '@/assets/svg/menu.svg'
import Drawer from '@/components/Drawer'
import LogoBlock from '../LogoBlock'  
import { request } from '@/utils/request'

interface MenuProps {
  dataSource: MenuConfig[]
  activeKey: string
  onChange: (e: MenuConfig) => void
}

const Menu: Component<MenuProps> = (props) => {

  const [showDrawer, setShowDrawer] = createSignal(false)

  return <div class={styles.menu}>
    <div class={styles.menu_icon_box}>

      <img src={menuSvg} class={styles.menu_icon} onClick={() => setShowDrawer(true)}></img>
    </div>
    <div>
      <For each={props.dataSource}>
        {(ele) => {
          return <div class={
            ele.disabled
              ? `${styles.menu_item} ${styles.menu_item_disabled}`
              : ele.key === props.activeKey
                ? `${styles.menu_item} ${styles.menu_item_active}`
                : styles.menu_item
          }
            onClick={() => !ele.disabled && props.onChange(ele)}>{ele.label}</div>
        }}
      </For>
    </div>
    <Drawer visable={showDrawer()} onClose={() => setShowDrawer(false)} >
      <div onClick={async () => {
      const ret = await request({
        url: 'xxx',
      })
      console.log('ret', ret)
      }}>
      <LogoBlock styleList={[{
        margin: '0 auto',
        width: '200px',
        display: 'flex',
        "justify-content": 'center',
        "align-items": 'center',
        padding: '10px 0',
        "border-radius": '6px',
        // background: 'rgba(0, 0, 0, 0.03)',
        // border: '1px solid rgba(0, 0, 0, 0.04)',
        "margin-top": '20px'
      }]}  />
      </div>
      <div class={styles.menu_list_box}>
        <For each={props.dataSource}>
          {(ele) => {
            return <div class={
              ele.disabled
                ? `${styles.menu_list_item} ${styles.menu_list_item_disabled}`
                : ele.key === props.activeKey
                  ? `${styles.menu_list_item} ${styles.menu_list_item_active}`
                  : styles.menu_list_item
            }
              onClick={() => {
                setShowDrawer(false)
                !ele.disabled && props.onChange(ele)
              }}>{ele.label}</div>
          }}
        </For>
      </div>
    </Drawer>
  </div>
}

export default Menu