import styles from './index.module.less';
import { createSignal, For, Show } from 'solid-js';
import LogoBlock from '../LogoBlock';

/**
 * 菜单项配置接口，定义了菜单项的属性。
 *
 * @typedef {Object} MenuConfig
 * @property {string} label - 菜单标签文本。
 * @property {string} key - 菜单项对应的路由或标识符。
 * @property {boolean} [disabled] - 是否禁用该菜单项，默认为 false。
 */

/**
 * 菜单组件属性接口，定义了菜单组件接收的属性。
 *
 * @typedef {Object} MenuProps
 * @property {MenuConfig[]} dataSource - 菜单项数据源。
 * @property {string} activeKey - 当前激活的菜单项键。
 * @property {function(MenuConfig): void} onChange - 点击菜单项时触发的回调函数。
 */

/**
 * 菜单组件，用于展示和交互导航菜单。
 *
 * @param {MenuProps} props - 组件属性。
 */
const Menu = (props) => {
  const [showDrawer, setShowDrawer] = createSignal(false);
  const [isMobileScreen, setIsMobileScreen] = createSignal(false);

  // 注意：这里需要添加逻辑来检测屏幕大小并设置 isMobileScreen 的值。
  // 您可以使用 `useMediaQuery` 或者其他方法来实现这一点。

  return (
    <div class={styles.menu}>
      <Show when={isMobileScreen()}>
        <div style={{
          'margin-left': '6px',
          'margin-top': '9px',
          display: 'inline-block'
        }}>
          <button>测试</button>
        </div>
      </Show>
      <Show when={!isMobileScreen()}>
        <div>
          <For each={props.dataSource}>
            {(ele) => {
              return (
                <div
                  class={
                    ele.disabled
                      ? `${styles.menu_item} ${styles.menu_item_disabled}`
                      : ele.key === props.activeKey
                        ? `${styles.menu_item} ${styles.menu_item_active}`
                        : styles.menu_item
                  }
                  onClick={() => !ele.disabled && props.onChange(ele)}
                >
                  {ele.label}
                </div>
              );
            }}
          </For>
        </div>
      </Show>

      {/* <Button onClick={() => setShowDrawer(true)}>letft</Button> */}
      <Show when={isMobileScreen()}>
        {/* <div class={styles.menu_list_box}>
          <For each={props.dataSource}>
            {(ele) => {
              return (
                <div
                  class={
                    ele.disabled
                      ? `${styles.menu_list_item} ${styles.menu_list_item_disabled}`
                      : ele.key === props.activeKey
                        ? `${styles.menu_list_item} ${styles.menu_list_item_active}`
                        : styles.menu_list_item
                  }
                  onClick={() => {
                    setShowDrawer(false);
                    !ele.disabled && props.onChange(ele);
                  }}
                >
                  {ele.label}
                </div>
              );
            }}
          </For>
        </div> */}
      </Show>
    </div>
  );
};

export default Menu;