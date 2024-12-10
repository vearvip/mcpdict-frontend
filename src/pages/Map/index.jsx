import React, { useState } from 'react'
import Amap from '../../components/Amap'
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
import { useMobile } from '../../utils/hooks';


export default () => {

  const { store, setStore } = useStore()
  const [inputValue, setInputValue] = useState()
  const [formData, setFormData] = useState(
    getLocalFilterData()
  )
  const isMobile = useMobile()
  const [searchResult, setSearchResult] = useState()
  const [radioValue, setRadioValue] = useState()
  const [loading, setLoading] = useState(false)

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
          const phonetic = parseSplitStr(selectedItem[dialectName]).map(ele => ele.phonetic).join(' ');
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

  const handleSearch = async () => {
    // console.log('formData', formData)
    // console.log('inputValue', inputValue)
    let dialectList = getSearchDialectList(formData, store.dialectCateTree)
    setLoading(true)
    try {
      const result = await queryChars({
        charList: [inputValue],
        dialectList
      });
      const searchResult = (result.data || []).map(ele => {
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
      console.log(result)

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
  }

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value)
    // console.log('value', value)
  }


  return <div
    className={`${styles.map_box}`}
    style={{
      display: isMobile ? 'block' : 'flex',
    }}>
    <div
      className={`${styles.map_left_box}`}
      style={{
        ...(
          isMobile 
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

      <Filter onChange={handleFilterChange} />
      <Input.Search
        value={inputValue}
        placeholder="请输入单字"
        loading={loading}
        enterButton
        maxLength={1}
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
    <Amap
      // dialectInfos={store.dialectInfos.map(ele => ({ ...ele, phonetic: 'dzang5' }))}
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