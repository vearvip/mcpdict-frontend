import { logoUrl } from '../../utils';
import styles from './index.module.less';
import logo from '@/assets/webp/logo.webp';

/**
 * LogoBlock 组件，用于展示应用的 Logo。
 *
 * @param {Object} props - 组件属性。
 * @param {import('react').CSSProperties[]} [props.styleList] - 自定义样式列表，包含两个元素，分别为外层 div 和 img 的样式。
 */
const LogoBlock = (props) => {

  return (
    <div className={styles.logo_box} style={props?.styleList?.[0] ?? {}}>
      <img className={styles.logo}
        src={logoUrl}
        alt="Logo"
        style={props?.styleList?.[1] ?? {}} />
    </div>
  );
};

export default LogoBlock;