import { Component, createEffect, JSX } from 'solid-js'
import styles from './index.module.less' 
import logo from '@/assets/webp/logo.webp'

const LogoBlock: Component<{
  styleList?: JSX.CSSProperties[]
}> = (props) => { 
  // createEffect(() => console.log({props}))

  return <div class={styles.logo_box} style={props?.styleList?.[0] ?? {}} >
    <img class={styles.logo} src={logo as any} style={props?.styleList?.[1] ?? {}} /> 
  </div>
}


export default LogoBlock
