import { Component, createEffect, JSX } from 'solid-js'
import styles from './index.module.less' 
import { logo, logoText } from "@/utils/asstes";  

const LogoBlock: Component<{
  styleList?: JSX.CSSProperties[]
}> = (props) => { 
  createEffect(() => console.log({props}))

  return <div class={styles.logo_box} style={props?.styleList?.[0] ?? {}} >
    <img class={styles.logo} src={logo as any} style={props?.styleList?.[1] ?? {}} />
    <img class={styles.logo_text} src={logoText as any} style={props?.styleList?.[2] ?? {}} />
  </div>
}


export default LogoBlock
