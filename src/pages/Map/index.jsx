import React, { useState } from 'react'
// import AMap from '../../components/AMap'
// import TMap from '../../components/TMap'
import MapTiler from '../../components/MapTiler'
import styles from './index.module.less';
import Dialog from '../../components/Dialog'
import { Button, Form, Select } from 'antd';
import useStore from '@/store';
import { JianCheng } from '../../utils/constant'
import { showDialectMap } from '../../components/DialectMap';
import { Filter, getLocalFilterData, setLocalFilterData } from '../../components/Filter';
import { Input } from 'antd';
import { getSearchDialectList, parseSplitStr } from '../../utils';
import { queryChars } from '../../services';
import { Radio } from 'antd';
import { useMemo } from 'react';
import { usePad } from '../../utils/hooks';
import { useSearchParams } from 'react-router';
import { useAsyncEffect } from 'ahooks';
import { useNavigate } from 'react-router';
import { getLocalPageSettingData } from '../Setting';
import { extractHanzi, unicodeLengthIgnoreSequence } from '@vearvip/hanzi-utils';


export default () => {
  let navigate = useNavigate();
  const { store, setStore } = useStore()
  const [formData, setFormData] = useState(
    getLocalFilterData()
  )
  const isPad = usePad()
  const [searchResult, setSearchResult] = useState()
  const [radioValue, setRadioValue] = useState()
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q'))

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

  const search = async () => {
    // console.log('formData', formData)
    // console.log('inputValue', inputValue) 
    let dialectList = getSearchDialectList(formData, store.dialectCateTree, store.dialectDistrictTree)
    setLoading(true)
    try {
      const result = await queryChars({
        charList: [inputValue],
        dialectList
      });
      const searchResult = (result?.data?.data ?? []).map(ele => {
        return {
          ...ele,
          value: ele.char,
          label: ele.char,
        }
      })
      setSearchResult(searchResult)
      if (searchResult.length > 0) {
        setRadioValue(searchResult[0].value)
      }
      // console.log(result)

    } catch (error) {
      console.log('error', error)
      // message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = allValues => {
    console.log('allValues', allValues)
    setLocalFilterData(allValues)
    setFormData(allValues)
    setSearchResult([])
  }

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value)
    // console.log('value', value)
  }
  const handleSearch = () => {

    const q = searchParams.get('q');
    if (inputValue === q) {
      search()
    } else {
      navigate(`/map?q=${inputValue}`, { replace: true });
    }
  }

  useAsyncEffect(async () => {
    const q = searchParams.get('q');
    setLoading(true)
    if (q) {
      if (
        !store.dialectInfos
        || !Array.isArray(store.dialectInfos)
        || store.dialectInfos.length === 0
      ) {
        console.warn('⚠️ dialectInfos 尚未准备好')
        return
      }
      search();
    } else {
      setSearchResult([])

      setLoading(false)
    }
  }, [searchParams, store]);

  return <div
    className={`${styles.map_box}`}
    style={{
      display: isPad ? 'block' : 'flex',
    }}>
    <div
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

      <Filter onChange={handleFilterChange} hiddenQueryType />
      <Input.Search
        value={inputValue}
        placeholder="请输入单字"
        loading={loading}
        enterButton
        count={{ 
          // 最大字符数，不同于原生 `maxLength`，超出后标红但不会截断
          max: 1,
          // 自定义字符计数，例如标准 emoji 长度大于 1，可以自定义计数策略将其改为 1 
          strategy: (value) => { 
            return unicodeLengthIgnoreSequence(value)
          }, 
          // 当字符数超出 `count.max` 时的自定义裁剪逻辑，不配置时不进行裁剪
          exceedFormatter: (value, config) => { 
            let segments = new Intl.Segmenter().segment(value); 
            const hanziList = [...segments].slice(0, config.max) 
            return hanziList.map(ele => ele.segment).join('')
          }
        }}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={searchResult}
        value={radioValue}
        onChange={handleRadioChange}
        style={{
          marginTop: 25
        }}
      />
    </div>
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