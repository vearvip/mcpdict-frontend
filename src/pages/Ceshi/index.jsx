import { Cascader } from 'antd'
import { Input } from 'antd'
import React from 'react'
import { useState } from 'react'
import useStore from '@/store'
import { Tree } from 'antd'
import { Menu } from 'antd'

function VearSelect(props) {
  const {
    value,
    onChange,
    dataSource
  } = props
  return <div>
    <Input />
    <div style={{
      background: 'white',
      marginTop: 5,
      height: '30vh',
      boxSizing: 'border-box',
      overflow: 'auto'
    }}> 
    <Menu
      siz
      items={dataSource.map(ele => ({
        ...ele,
        key: ele.value,
        title: ele.label
      }))}
      style={{
        width: '100%'
      }}
    // onChange={onChange}
    // disabled={disabled} 
    />
    </div>

  </div>
}

export default () => {
  const { store } = useStore()
  const [value, setValue] = useState()

  return <div className="box" style={{
    marginLeft: 10,
    background: 'pink'
  }}>
    {/* <VearSelect
      value={value}
      onChange={setValue}
      dataSource={
        store.dialectNames.map(ele => ({
          label: ele,
          value: ele
        }))
      }
    /> */}

  </div>
}