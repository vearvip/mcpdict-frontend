import styles from './index.module.less'
import { Component, For, JSX } from 'solid-js'
import { MenuConfig } from '@/types'
import LogoBlock from '@/components/LogoBlock'
import menuSvg from '@/assets/menu.svg'

interface MenuProps {
  dataSource: MenuConfig[]
  activeKey: string
  onChange: (e: MenuConfig) => void
}

const Menu: Component<MenuProps> = (props) => { 

  return <div class={styles.menu}>
    <div class={styles.logo_block}>
      <LogoBlock styleList={[{
        margin: '10px 0 0 20px', 
        height: '24px'
      }, {
        width: '24px', 
        'margin-right': '5px'
      }, {
        height: '34px'
      }]} />
    </div>
    <div class={styles.menu_icon_box}>
      
    <img src={menuSvg} class={styles.menu_icon}></img>
    </div>
    <div>
      <For each={props.dataSource}>
          {(ele) => {
            return <div class={
              ele.key === props.activeKey
                ? `${styles.menu_item} ${styles.menu_item_active}`
                : styles.menu_item
            }
            onClick={() => props.onChange(ele)}>{ele.label}</div>
          }}
      </For>
    </div>
  </div>
}

export default Menu