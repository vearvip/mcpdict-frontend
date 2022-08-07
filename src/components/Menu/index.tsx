import styles from './index.module.less'
import { Component, For, JSX } from 'solid-js'
import { MenuConfig } from '@/types'

interface MenuProps {
  dataSource: MenuConfig[]
  activeKey: string
  onChange: (e: MenuConfig) => void
}

const Menu: Component<MenuProps> = (props) => { 

  return <div class={styles.menu}>
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
}

export default Menu