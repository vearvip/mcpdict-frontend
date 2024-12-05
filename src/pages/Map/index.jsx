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
    <Button onClick={() => showDialectMap()}>showDialectMap</Button>
  </div>
}