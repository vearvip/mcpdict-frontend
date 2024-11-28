import { Component, JSX } from "solid-js";
import styles from "./index.module.less";

interface ButtonProps {
  type?: 'primary' | 'noraml';
  children?: any;
  onClick?: (...args: any) => {};
  style?: JSX.CSSProperties
}

const Button: Component<ButtonProps> = (props) => {
  return <div class={`${styles.button} ${styles[`button_${props.type || 'normal'}`]}`} style={props.style ?? {}} onClick={(...args) => props.onClick && props.onClick(...args)}>
    {
      props.children
    }
  </div>
}

export default Button