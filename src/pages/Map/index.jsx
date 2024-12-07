import React, { useState } from 'react'
import Amap from '../../components/Amap'
import styles from './index.module.less';
import Dialog from '../../components/Dialog'
import { Button, Form, Select } from 'antd';
import useStore from '@/store';
import { JC } from '../../utils/constant'
import { showDialectMap } from '../../components/DialectMap';


export default () => {
  const [open, setOpen] = useState(true)
  const [form] = Form.useForm();
  const { store, setStore } = useStore()
  return <div
    className={`${styles.map_box} box`}
    style={{ 
    }}>

    <Amap
      style={{
        width: 'calc(100% - 20px)',
        height: 'calc(100vh - 60px - 80px - 40px - 20px)',
        margin: '10px 0',
        borderRadius: 10,
        overflow: 'hidden'
      }}
    />
    {/* <Button onClick={() => showDialectMap()}>showDialectMap</Button> */}
  </div>
}