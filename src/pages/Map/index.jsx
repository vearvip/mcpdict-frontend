import React, { useState, useEffect } from 'react'
// import AMap from '../../components/AMap'
// import TMap from '../../components/TMap'
import MapTiler from '../../components/MapTiler'
import MapFilter from '../../components/MapFilter'
import styles from './index.module.less';
import Dialog from '../../components/Dialog'
import { Button, Form, Select } from 'antd';
import useStore from '@/store';
import { JianCheng } from '../../utils/constant'
import { showDialectMap } from '../../components/DialectMap';
import { parseSplitStr } from '../../utils';
import { useMemo } from 'react';
import { useMobile, usePad } from '../../utils/hooks';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';
import { getLocalPageSettingData } from '../Setting';
import { extractHanzi, unicodeLengthIgnoreSequence } from '@vearvip/hanzi-utils';
import eventBus from '../../event/bus';


export default () => { 
  const { store, setStore } = useStore()
  const isPad = usePad()
  const isMobile = useMobile()
  const [searchResult, setSearchResult] = useState()
  const [radioValue, setRadioValue] = useState()
  const [searchParams] = useSearchParams();

  const mapDialectInfos = useMemo(() => {
    const dialectInfos = JSON.parse(JSON.stringify(store?.dialectInfos))
    if (
      radioValue
      && searchResult && Array.isArray(searchResult) && searchResult.length > 0
      && dialectInfos && Array.isArray(dialectInfos) && dialectInfos.length > 0
    ) {
      const _mapDialectInfos = []
      const selectedItem = searchResult.find(ele => ele.char === radioValue).charInfo
      for (const dialectName in selectedItem) {
        if (Object.prototype.hasOwnProperty.call(selectedItem, dialectName)) {
          const phonetic = parseSplitStr(selectedItem[dialectName], dialectName).map(ele => ele.phonetic).join(' ');
          const dialectInfo = dialectInfos.find(ele => ele[JianCheng] === dialectName)
          // console.log('dialectInfo', dialectName, dialectInfo)
          dialectInfo.phonetic = phonetic
          _mapDialectInfos.push(dialectInfo)
        }
      }
      return _mapDialectInfos

    } else {
      return []
    }

  }, [searchResult, radioValue, store])

  const handleSearchResultChange = (newSearchResult) => {
    setSearchResult(newSearchResult);
  };

  const handleRadioValueChange = (newRadioValue) => {
    setRadioValue(newRadioValue);
  };

 
  useEffect(() => { 
    const handler = (...args) => { 
      handleSearchResultChange(...args);
    }
    eventBus.on('MAP_SEARCH_EVENT', handler)
    return () => eventBus.off('MAP_SEARCH_EVENT', handler)
  }, [])

  useEffect(() => {
    const handler = (...args) => {
      handleRadioValueChange(...args);
    }
    eventBus.on('MAP_RADIO_EVENT', handler)
    return () => eventBus.off('MAP_RADIO_EVENT', handler)
  }, [])

  return <div
    className={`${styles.map_box}`}
    style={{
      display: isPad ? 'block' : 'flex',
    }}>
    {
      !isMobile && (<div
        className={`${styles.map_left_box}`}
        style={{
          ...(
            isPad
              ? {
                width: '100%',
                // height: 'calc(100vh - 60px - 20px)' : 'calc(100vh - 60px - 20px)', 
                minHeight: 190,
                marginBottom: 10,
              }
              : {
                height: 'calc(100vh - 60px - 20px)',
              }
          )
        }}
      >
  
        <MapFilter
          defaultValue={searchParams.get('q')}
          onSearchResultChange={handleSearchResultChange}
          onRadioValueChange={handleRadioValueChange}
        />
      </div>)
    }
    {/* <AMap */}
    {/* <TMap */}
    <MapTiler
      dialectInfos={mapDialectInfos}
      style={{
        // width: 'calc(100% - 20px)',
        width: '100%',
        height: 'calc(100vh - 60px - 20px)',
        // marginTop: '10px',
        // marginLeft: '10px',
        borderRadius: 8,
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: '1px solid var(--border-color)',
        // border: '1px solid blue',
        backgroundColor: 'white'
      }}
    />
  </div>
}