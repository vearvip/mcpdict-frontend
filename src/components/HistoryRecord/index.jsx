import { Menu } from 'antd'
import React from 'react'

export const getHisotryRecordList = () => {
  let hisotryRecordList = []
  try {
    hisotryRecordList = JSON.parse(localStorage.getItem('hisotryRecordList')) || []
  } catch (err) {
    console.log('读取本地搜索历史记录失败：', err)
  }
  return hisotryRecordList
}

export const setHisotryRecordList = (hisotryRecordList = []) => {
  if (hisotryRecordList.length > 100) {
    hisotryRecordList = hisotryRecordList.slice(0, 100)
  } 
  try {
    localStorage.setItem('hisotryRecordList', JSON.stringify(hisotryRecordList)) 
  } catch (err) {
    console.log('存储本地搜索历史记录失败：', err)
  }
  return hisotryRecordList
}

export const addHisotryRecordList = (recordValue) => {
  if (!recordValue) return;
  const hisotryRecordList = getHisotryRecordList()
  if (!hisotryRecordList.map(item => item.key).includes(recordValue)) {
    hisotryRecordList.unshift({
      label: recordValue,
      key: recordValue
    })
  }
  try {
    localStorage.setItem('hisotryRecordList', JSON.stringify(hisotryRecordList)) 
  } catch (err) {
    console.log('存储本地搜索历史记录失败：', err)
  }
  return hisotryRecordList
}

export default ({
  onChange,
}) => {
  const hisotryRecordList = getHisotryRecordList()
  const handleMenuClick = ({
    key
  }) => { 
    onChange && onChange(key)
  }
  return <div>
    <Menu
      selectedKeys={[]}
      onClick={handleMenuClick}
      mode="inline"
      size="small"
      items={hisotryRecordList}
    />

  </div>
}