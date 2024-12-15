import { Cascader } from 'antd'
import { Input } from 'antd'
import useStore from '@/store'
import { Tree } from 'antd'
import { Menu } from 'antd'
import React, { useState, useEffect, useRef } from 'react';
import { Popover } from 'antd';
import NProgress from 'nprogress';

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


const MyComponent = () => {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, []);

  return (
    <Popover
      content={<div style={{ width }}>Content</div>}
      title="Title"
    >
      <div ref={divRef} style={{ width: 'calc(100vh - 40px)', margin: 20 }}>
        Trigger
      </div>
    </Popover>
  );
};

const SyncWidthPopover = () => {
  const containerRef = useRef(null);

  // 使用 getPopupContainer 将 Popover 内容挂载到同一个容器中
  const getPopupContainer = (triggerNode) => containerRef.current;

  return (
    <div ref={containerRef}
    //  style={{ position: 'relative' }}
    >
      {/* div1 */}
      <Popover
        trigger={'click'}
        content={<div style={{ width: 'calc(100vw - 80px)' }}>这是 Popover 的内容</div>}
        title="标题"
        getPopupContainer={getPopupContainer}
      >
        <div style={{ backgroundColor: 'green', width: 'calc(100vw - 40px)', boxSizing: 'border-box' }}>
          悬停我以显示 Popover
        </div>
      </Popover>
    </div>
  );
};

export default () => {
  const { store } = useStore()
  const [value, setValue] = useState()
      NProgress.start();

  return <div className="box" style={{
    marginLeft: 10,
    background: 'pink'
  }}>
    <SyncWidthPopover />
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