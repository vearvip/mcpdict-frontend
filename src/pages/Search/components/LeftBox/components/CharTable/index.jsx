import React from 'react';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import CharLabel from '../CharLabel';
import { parseSplitStr, getBackgroundColorFromItem } from '@/utils';
import CharPhoneticExplain from '../CharPhoneticExplain';
import { showDialectInfo } from '@/components/DialectInfo';

const CharTable = ({
  searchData = []
}) => {
  const [columns, setColumns] = useState([])
  const [tableData, setTableData] = useState([])

  const genColumns = (searchData = []) => {
    const charColumns = []
    searchData.forEach(charItem => {
      charColumns.push({
        title: <CharLabel
          char={charItem.char}
        // originChar={charItem.originChar}
        />,
        dataIndex: charItem.char,
        width: 100,
        render: (value, record) => {
          return <div>{record[charItem.char] || '-'}</div>
        }
      })
    })
    const dialectColumn = {
      title: false,
      dataIndex: 'dialectName',
      width: 100,
      fixed: 'left',
      render: (value, record) => {
        return <div
          style={{
            // cursor: 'pointer'
          }} 
        >{value}</div>
      }

    }
    setColumns([
      dialectColumn,
      ...charColumns
    ])
  }
  const genTableData = (searchData = []) => {
    const newTableData = []
    searchData.forEach((charItem, charIndex) => {
      for (const dialectName in charItem.charInfo) {
        if (Object.prototype.hasOwnProperty.call(charItem.charInfo, dialectName)) {
          const findItem = newTableData.find(ele => ele.dialectName === dialectName)
          const phonetic = charItem.charInfo[dialectName];
          const infos = parseSplitStr(phonetic)
          const infoJSX = infos.map((info, subIndex) => (
            <CharPhoneticExplain
              key={`info_item_${charIndex}_${subIndex}_${charItem.char}`}
              phonetic={info.phonetic}
              explain={info.explain}
            />
          ))
          if (findItem) {
            findItem[charItem.char] = infoJSX
          } else {
            // console.log('infos', infos)
            const item = {
              dialectName,
              [charItem.char]: infoJSX
            }
            newTableData.push(item)
          }
        }
      }
    })
    setTableData(newTableData)

  }

  useEffect(() => {
    genColumns(searchData)
    genTableData(searchData)

  }, [searchData])

  console.log('searchData', searchData)
  return <Table
    rowKey="dialectName"
    scroll={{
      x: 600,
      y: 600,
    }}
    virtual
    columns={columns}
    dataSource={tableData}
    bordered
    pagination={false}
    style={{
      margin: '10px'
    }}
  />
};



export default CharTable;