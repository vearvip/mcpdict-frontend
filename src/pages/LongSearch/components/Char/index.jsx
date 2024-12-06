import React , {useState}from 'react'
import styles from './index.module.less';
import { Popover } from 'antd';


/**
 * 单字注音展示
 *
 * @param {Object} props - 组件属性。
 * @param {Object[]} props.charInfos - 要显示的字符信息
 */
export default ({
  charInfos
}) => {
  const [charInfoIndex, setCharInfoIndex] = useState(0)
  const [phoneticIndex, setPhoneticIndex] = useState(0)

  return charInfos && Array.isArray(charInfos) && charInfos.length > 0 ?
    <Popover
      content={<div className={styles.popover_content_box}>
        {
          charInfos.map((charInfo, charInfoIdx) => {
            return charInfo.phonetics.map((phonetic, phoneticIdx) => {
              const isActived = charInfoIdx === charInfoIndex && phoneticIdx === phoneticIndex
              return <div
                key={`${charInfoIdx}_${phonetic}_${phoneticIdx}`}
                className={`${styles.char_info_box} ${styles.char_poppver_box} ${isActived ? styles.char_poppver_box_actived : ''}`}
                onClick={() => {
                  setCharInfoIndex(charInfoIdx)
                  setPhoneticIndex(phoneticIdx)
                }}
              >
                <div className={styles.phonetic_box}>
                  {
                    phonetic
                  }
                </div>
                <div className={styles.char_box}>
                  {
                    charInfo.char
                  }
                </div>
              </div>
            })
          })
        }
      </div>}
      trigger="click"
    >
      <div style={{
        display: 'inline-block'
      }}>
        <div className={styles.char_info_box}>
          <div className={styles.phonetic_box}>
            {
              charInfos[charInfoIndex].phonetics[phoneticIndex]
            }
          </div>
          <div className={styles.char_box}>
            {
              charInfos[charInfoIndex].char
            }
          </div>
        </div>
      </div>
    </Popover>
    : null
}