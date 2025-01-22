import React, { useState, useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Modal, Drawer, Button, Table } from 'antd';
import AutoFitText from '../../../../components/AutoFitText';
import { JianCheng } from '../../../../utils/constant';

const DialectTable = (props) => {
  const [sortedInfo, setSortedInfo] = useState({});

  const columns = [
    {
      key: '語言',
      title: '語言',
      dataIndex: '簡稱',
      render: (val) => <AutoFitText onlyName dialectName={val} />,
      sorter: false, // 禁用此列的排序
      filters: (props?.dataSource ?? []).map(ele => ({
        ...ele,
        text: ele[JianCheng],
        value: ele[JianCheng],
      })),
      filterMode: 'menu',
      filterSearch: true,
      onFilter: (value, record) => record[JianCheng].startsWith(value),
    },
    {
      key: '字數',
      title: '字數',
      dataIndex: '字數',
      sorter: (a, b) => a['字數'] - b['字數'],
      sortDirections: ['descend', 'ascend'], // 允许降序和升序
      align: 'right',
    },
    {
      key: '□數',
      title: '□數',
      dataIndex: '□數',
      sorter: (a, b) => a['□數'] - b['□數'],
      sortDirections: ['descend', 'ascend'],
      align: 'right',
    },
    {
      key: '音節數',
      title: '音節數',
      dataIndex: '音節數',
      sorter: (a, b) => a['音節數'] - b['音節數'],
      sortDirections: ['descend', 'ascend'],
      align: 'right',
    },
    {
      key: '不帶調音節數',
      title: '不帶調音節數',
      dataIndex: '不帶調音節數',
      sorter: (a, b) => a['不帶調音節數'] - b['不帶調音節數'],
      sortDirections: ['descend', 'ascend'],
      align: 'right',
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo({
      columnKey: sorter.columnKey,
      order: sorter.order,
    });
  };

  return (
    <div>
      <Table
        virtual
        pagination={false}
        size="small"
        columns={columns}
        rowKey="語言"
        scroll={{ y: 500 }}
        dataSource={props.dataSource ?? []}
        onChange={handleTableChange}
        sortedInfo={sortedInfo}
        style={{
          marginTop: 20
        }}
      />
    </div>
  );
};

export default DialectTable;