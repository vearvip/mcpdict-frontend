import React from 'react'
import styles from './index.module.less'; // 引入 CSS Module 
import { replaceWithCircled } from '@/utils'


/**
 * 
 * @param {Object} props 
 * @param {String} props.phonetic 音标
 * @param {String} props.explain 音标解释
 * @param {{ [key: string]: Array<String> }} props.toneMapConfig 音标map
 * @param {Object} props.localPageSettingData 网页设置
 * @returns React.ReactElement
 */
const CharPhoneticExplain = (props) => {
  let { phonetic, explain, toneMapConfig = {}, localPageSettingData } = props;
  function renderPhonetic(phonetic = '') {
    const toneType = localPageSettingData.toneType;
    const tonePitchType = localPageSettingData.tonePitchType;

    // console.log('toneMapConfig', toneMapConfig, phonetic)
    for (const toneKey in toneMapConfig) {
      if (Object.prototype.hasOwnProperty.call(toneMapConfig, toneKey) && typeof phonetic === 'string') {
        const toneMap = toneMapConfig[toneKey];
        if (toneMap) {
          if (phonetic.indexOf(toneKey) !== -1) {
            phonetic = phonetic.replace(toneKey, '')
            let tone = ''
            let pitch = tonePitchType === 'hidden' ? '' : toneMap[0]

            // 额外处理一下并排的情况
            if (toneType === 'bingPai') {
              tone = toneMap[2]
              pitch = toneMap[0]
              phonetic = <div style={{ display: 'inline-flex' }}>
                <div>{phonetic}</div>
                <div>
                  <div style={{ fontSize: 8, }}>{pitch}</div>
                  <div style={{ fontSize: 8, }}>{tone}</div>
                </div>
              </div>
            } else { // 其他情况正常处理
              if (toneType === 'pinYin') {
                tone = toneKey
              } else if (toneType === 'baSheng') {
                tone = replaceWithCircled(toneKey);
              } else if (toneType === 'siSheng') {
                tone = replaceWithCircled(toneMap[2]);
              } else if (toneType === 'pingShangQvRu') {
                tone = toneMap[3];
              } else if (toneType === 'siJiao') {
                tone = toneMap[4];
              } else if (toneType === 'hidden') {
                // 隐藏调就不用管
              }
              phonetic = <div style={{ display: 'inline-flex' }}>
                <div>{phonetic}</div>
                <div style={{ fontSize: 8 }}>{pitch}</div>
                <div>{tone}</div>
              </div>
            }
          }
        }
      }
    }
    return phonetic
  }

  return <div className={styles.phonetic_explain}>
    {
      phonetic && <span className={styles.phonetic}>{renderPhonetic(phonetic)}</span>
    }
    {
      explain && <span className={styles.explain}>{explain}</span>
    }
  </div>
}


export default CharPhoneticExplain