import React from 'react'
import styles from './index.module.less';
import { usePad } from '../../utils/hooks';

/**
 * 左右布局
 * @param {Object} props
 * @param {React.ReactNode} props.leftContent 左侧内容
 * @param {React.ReactNode} props.rightContent 右侧内容
 * @returns React.ReactNode
 */
export default (props) => {
  const isPad = usePad()


  return <div
    className={`${styles.main_box}`}
    style={{
      display: isPad ? 'block' : 'flex',
    }}>
    <div
      className={`${styles.left_box}`}
      style={{
        ...(
          isPad
            ? {
              width: '100%',
              minHeight: 190,
              marginBottom: 10,
            }
            : {
              height: 'calc(100vh - 60px - 20px)',
            }
        )
      }}
    >
      {
        props.leftContent
      }

    </div>
    <div
      className={`${styles.right_box}`}
    >
      {
        props.rightContent
      }
    </div>
  </div>
}