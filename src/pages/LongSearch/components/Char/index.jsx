import React, { useState } from 'react'
import styles from './index.module.less';
import { Popover } from 'antd';
import { convertPitchNum2Curve, getRealPhoneticAndToneKey } from '../../../../utils';
import { useMemo } from 'react';
import { Card } from 'antd';


const genFinallyPhonetic = (localPageSettingData, phonetic) => {
  return phonetic
}
const genFinallyTonePitch = (localPageSettingData, tonePitch) => {
  return (
    localPageSettingData?.longSearchPageFormat == 3
    || localPageSettingData?.longSearchPageFormat == 4
    || localPageSettingData?.longSearchPageFormat == 7
    || localPageSettingData?.longSearchPageFormat == 8
  ) ? convertPitchNum2Curve(tonePitch)
    : ''
}
const genFinallyTone = (localPageSettingData, tone) => {
  return (
    localPageSettingData?.longSearchPageFormat == 5
    || localPageSettingData?.longSearchPageFormat == 6
    || localPageSettingData?.longSearchPageFormat == 7
    || localPageSettingData?.longSearchPageFormat == 8
  ) ? tone
    : ''
}
const genFinallyChar = (localPageSettingData, char) => {
  return (
    localPageSettingData?.longSearchPageFormat == 2
    || localPageSettingData?.longSearchPageFormat == 4
    || localPageSettingData?.longSearchPageFormat == 6
    || localPageSettingData?.longSearchPageFormat == 8
  ) ? char
    : ''
}

const CharItem = ({
  className,
  onClick,
  phonetic,
  tonePitch,
  tone,
  char,
}) => {
  return <div className={className} onClick={onClick}>
    <div className={styles.phonetic_box}>
      {
        phonetic
      }
      {
        tonePitch
      }
      {
        tone
      }
    </div>
    <div className={styles.char_box}>
      {
        char
      }
    </div>
  </div>
}

/**
 * 单字注音展示
 *
 * @param {Object} props - 组件属性。
 * @param {Object[]} props.charInfos - 要显示的字符信息
 * @param {{ [key: string]: Array<String> }} props.toneMapConfig 音标map
 * @param {Object} props.localPageSettingData 网页设置
 */
export default ({
  charInfos,
  toneMapConfig,
  localPageSettingData,
  onChange
}) => {
  const [charInfoIndex, setCharInfoIndex] = useState(0)
  const [phoneticIndex, setPhoneticIndex] = useState(0)
  const nowCharItem = useMemo(() => {
    const nowOriginPhonetic = charInfos?.[charInfoIndex]?.phonetics?.[phoneticIndex]
    const char = charInfos?.[charInfoIndex]?.char
    let { phonetic, toneKey, tonePitch } = getRealPhoneticAndToneKey(nowOriginPhonetic, toneMapConfig)
    const charItem = {
      phonetic: genFinallyPhonetic(localPageSettingData, phonetic),
      tonePitch: genFinallyTonePitch(localPageSettingData, tonePitch),
      tone: genFinallyTone(localPageSettingData, toneKey),
      char: genFinallyChar(localPageSettingData, char),
    }
    onChange && onChange(charItem)
    return charItem
  }, [charInfos, charInfoIndex, phoneticIndex])

  const hasMultiPhonetic = useMemo(() => {
    return (charInfos || []).map(ele => ele?.phonetics ?? []).flat().length > 1
  }, [charInfos])


  return charInfos && Array.isArray(charInfos) && charInfos.length > 0 ?
    <Popover
      content={<div className={styles.popover_content_box}>
        {
          charInfos.map((charInfo, charInfoIdx) => {
            return charInfo.phonetics.map((originPhonetic, phoneticIdx) => {
              let { phonetic, toneKey, tonePitch } = getRealPhoneticAndToneKey(originPhonetic, toneMapConfig)
              let tone = toneKey
              const isActived = charInfoIdx === charInfoIndex && phoneticIdx === phoneticIndex
              // phonetic = genFinallyPhonetic(localPageSettingData, phonetic)
              tonePitch = genFinallyTonePitch(localPageSettingData, tonePitch)
              // tone = genFinallyTone(localPageSettingData, tone)
              // let char = genFinallyChar(localPageSettingData, charInfo.char)


              return <CharItem
                key={`${charInfoIdx}_${originPhonetic}_${phoneticIdx}`}
                className={`${styles.char_info_box} ${styles.char_poppver_box} ${isActived ? styles.char_poppver_box_actived : ''}`}
                onClick={() => {
                  setCharInfoIndex(charInfoIdx)
                  setPhoneticIndex(phoneticIdx)
                }}
                phonetic={phonetic}
                tonePitch={tonePitch}
                tone={tone}
                char={charInfo.char}
              />
            })
          })
        }
      </div>}
      trigger="click"
    > 
        <CharItem
          className={`${styles.char_info_box} ${hasMultiPhonetic ? styles.char_info_box_has_multi_phonetic : ''}`}
          char={nowCharItem.char}
          phonetic={nowCharItem.phonetic}
          tonePitch={nowCharItem.tonePitch}
          tone={nowCharItem.tone}
          // onClick={() => console.log(charInfos)}
        /> 
    </Popover>
    : null
}