import { Component, createEffect, createSignal, For, JSX, onMount } from "solid-js";
import styles from "./index.module.less";
import { render, style } from 'solid-js/web';
import Button from "../Button";
import { random } from "@/utils";



interface DialogProps {
  title?: any;
  content?: any;
  children?: any;
  footer?: any;
  onOk?: (...args: any) => {};
  onCancel?: (...args: any) => {};
  onClose?: (...args: any) => {};
}


const Dialog: Component<DialogProps> = (props) => {
  return <>
    <div class={styles.dialog_wrapper}>
      <div class={styles.dialog}>
        <div class={styles.dialog_title}>
          {
            props.title
          }
        </div>
        <div class={styles.dialog_content}>
          {
            props.children ?? props.content
          }
        </div>
        <div class={styles.dialog_footer}>
          {
            props.footer
              ? props.footer
              : <div class={styles.dialog_footer_container}>
                <Button type="primary" style={{ "margin-right": '15px'  }} onClick={(...args) => props.onOk && props.onOk(...args)}>确定</Button>
                <Button onClick={(...args) => props.onCancel && props.onCancel(...args)}>取消</Button>
              </div>
          }
        </div>
      </div>
    </div>
    <div class={styles.dialog_mask} onClick={(...args) => props.onClose && props.onClose(...args)}/>
  </>
}

Dialog.show = (props: DialogProps) => {
  const id = 'dialog' + random(100000, 999999)
  render(() => <div id={id}>
    <Dialog {...props}></Dialog>
  </div>, document.body)
  return {
    close() {
      document.getElementById(id)?.remove()
    }
  }
}

export default Dialog