import React from 'react'
import styles from './index.module.less'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Radio } from 'antd';
import { ChenFangFenQv, DiTuJiErFenQv, YinDianFenQv } from '../../utils/constant';
import { useEffect } from 'react';
import { usePad } from '../../utils/hooks';
import { message } from 'antd';
import { getLocalFilterData, setLocalFilterData } from '../../components/Filter';
import useStore from '@/store';
import { transformDialectInfosToTree } from '../../utils';


const defaultPageSettingData = {
  partitionMode: YinDianFenQv,
  searchPageFormat: 'labelList',
  toneType: 'baShengShuZi',
  tonePitch: 'hidden',
}

export const getLocalPageSettingData = () => {
  let pageSettingData
  try {
    pageSettingData = JSON.parse(localStorage.getItem('pageSettingData')) || defaultPageSettingData
  } catch (err) {
    console.log('读取本地网页设置数据失败：', err)
    pageSettingData = defaultPageSettingData
  }
  return pageSettingData
}

export const setLocalPageSettingData = (pageSettingData) => {

  try {
    localStorage.setItem('pageSettingData', JSON.stringify(pageSettingData))
  } catch (err) {
    console.log('存储本地网页设置数据失败：', err)
  }
  return pageSettingData
}


export default () => {
  const [form] = Form.useForm();
  const isPad = usePad()
  const { store, setStore } = useStore()

  const handleFinish = (values) => {
    // console.log('Success:', values);
    setLocalPageSettingData(values)
    // 缓存完页面设置之后，清空筛选条件
    const filterData = getLocalFilterData()
    filterData.dialectArea = undefined
    setLocalFilterData(filterData)
    // 重新设置分区的treeData 
    const dialectCateTree = transformDialectInfosToTree(store.dialectInfos)
    // console.log('dialectCateTree', dialectCateTree);
    setStore({
      dialectCateTree: dialectCateTree,
    });
    message.success('设置成功')
  };


  useEffect(() => { 
    const pageSettingData = getLocalPageSettingData()
    for (const key in defaultPageSettingData) {
      const defaultFieldVal = defaultPageSettingData[key];
      if (!pageSettingData[key]) {
        pageSettingData[key] = defaultFieldVal
      }
    }
    form.setFieldsValue(pageSettingData)
  }, [])

  return (
    <div className={`${styles.setting_box} box`}>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        // disabled
        style={{
          maxWidth: 600,
        }}
        labelAlign="left"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="分区方案"
          name="partitionMode"
          rules={[
            {
              required: true,
              message: '请选择分区方案',
            },
          ]}
        >
          <Radio.Group
            optionType="button"
            options={[{
              label: '地图集二分区',
              value: DiTuJiErFenQv,
            }, {
              label: '音典分区',
              value: YinDianFenQv,
            }, {
              label: '陈邡分区',
              value: ChenFangFenQv,
            }]}
          />
        </Form.Item>
        <Form.Item
          label="调类样式"
          name="toneType"
          rules={[
            {
              required: true,
              message: '请选择调类样式',
            },
          ]}
        >
          <Radio.Group
            // optionType="button"
            options={[
              {
                label: '12345678',
                value: 'baShengShuZi',
              },
              {
                label: '①②③④⑤⑥⑦⑧',
                value: 'baShengShuZiDaiQvan',
                disabled: true,
              },
              {
                label: '①②③④',
                value: 'siShengShuZiDaiQvan',
                disabled: true,
              },
              {
                label: '平上去入',
                value: 'pingShuQvRu',
                disabled: true,
              },
              {
                label: '上排调值、下排调类',
                value: 'shangPaiDiaoZhiXiaPaiDiaoLei',
                disabled: true,
              },
              {
                label: '隐藏',
                value: 'hidden',
                disabled: true,
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="调值样式"
          name="tonePitch"
          rules={[
            {
              required: true,
              message: '请选择调值样式',
            },
          ]}
        >
          <Radio.Group
            // optionType="button"
            options={[{
              label: '曲线',
              value: 'curve',
              disabled: true,
            }, {
              label: '数字',
              value: 'number',
              disabled: true,
            }, {
              label: '隐藏',
              value: 'hidden',
            }
            ]} />
        </Form.Item>

        <Form.Item
          label="字音查询显示格式"
          name="searchPageFormat"
          rules={[
            {
              required: true,
              message: '请选择搜索页显示格式',
            },
          ]}
        >
          <Radio.Group optionType="button" options={[{
            label: '标签列表',
            value: 'labelList',
          }, {
            label: '表格',
            value: 'table',
            disabled: true,
          }]} />
        </Form.Item>


        <Form.Item label={isPad ? false : null}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}