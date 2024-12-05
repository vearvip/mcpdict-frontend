import styles from "./index.module.less";

/**
 * 按钮组件属性接口，定义了按钮组件接收的属性。
 *
 * @typedef {Object} ButtonProps
 * @property {'primary' | 'normal'} [type] - 按钮类型，默认为 'normal'。
 * @property {any} [children] - 按钮内的子元素或文本。
 * @property {Function} [onClick] - 点击按钮时触发的回调函数。
 * @property {import("react").CSSProperties} [style] - 自定义样式。
 */

/**
 * 按钮组件，用于创建可点击的按钮元素。
 *
 * @param {ButtonProps} props - 组件属性。
 */
const Button = (props) => {
  return (
    <div
      className={`${styles.button} ${styles[`button_${props.type || 'normal'}`]}`}
      style={props.style ?? {}}
      onClick={(event) => {
        if (props.onClick) props.onClick(event);
      }}
    >
      {props.children}
    </div>
  );
};

export default Button;