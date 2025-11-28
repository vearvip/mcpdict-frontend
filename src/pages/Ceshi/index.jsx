import React from 'react'
import HomophoneList from '../HomophoneList'
// import { List } from 'react-window';
import { useDynamicRowHeight } from 'react-window';
import { List } from "react-window";

// 随机生成1000条长度不一样的数据
const listData = Array.from({ length: 1000 }, (_, index) => {
  const length = Math.floor(Math.random() * 100) + 20; // 随机长度在20到120之间
  return `这是第 ${index + 1} 行，内容长度为 ${length}：` + 'A'.repeat(length);
});

console.log('listData', listData);


export default () => {
  return (
    <div style={{
      width: 400,
      height: 500,
      border: '1px solid red'
    }}>
      <List
        rowComponent={RowComponent}
        rowCount={listData.length}
        rowHeight={useDynamicRowHeight({
          defaultRowHeight: 50,
        })}
        rowProps={{
          listData,
        }}
      />

    </div>
  );
}



function RowComponent({
  index,
  listData,
  style
}) { 
  const name = listData[index];
  return <div style={{
    ...style,
    border: '1px solid blue',
    boxSizing: 'border-box',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  }}>{name}</div>;
}
