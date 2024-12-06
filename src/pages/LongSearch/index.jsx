import React, { useMemo, useState } from 'react';
import styles from './index.module.less';
import settingPng from '@/assets/svg/setting.svg';
import NoData from '@/components/NoData';
import LogoBlock from "@/components/LogoBlock";
import { Button, Select, Form, Input, message } from 'antd';
import { extractHanzi } from '@vearvip/hanzi-utils'
import useStore from '@/store';
import NProgress from 'nprogress';
import { queryChars, queryLongString } from '../../services';
import { splitStringInto2DArray } from '../../utils';
import Char from './components/Char';
import Dialog from '../../components/Dialog';


let string1 = `
忙的时候，想要休息；
度假的时候，想到未来。
穷的时候，渴望富有；
生活安逸了，怕幸福不能长久。
该决定的时候，担心结果不如预期；
看明白了，后悔当初没有下定决心。
不属于自己的，常常心存欲望；
握在手里了，又怀念未拥有前的轻松。
生命若不是现在，那是何时？

一个人可以毫无道理跟你做一辈子亲戚,但
一个人不会毫无道理跟你做一辈子朋友
我会想起与你们认识的种种.
也会想起发生过的点点滴滴.
直到我们都年老时是否会像现在这样坐在电脑前互诉心声？
不管如何,希望我们永远是真诚相对的朋友(知己)

朋友就是喜欢你也了解你的人
愿你都能珍惜身边每一个朋友
因为你我有缘份，才能成为朋友
可以成为知己的，更难得！
时间未必是你我成为知己的原因
但一定可以证明到
你对朋友的关怀不是白费！
希望您永远都系我的好朋友！
朋友，是你高兴时想跟他分享的，
朋友，是你不高兴时可以给你发脾气的，
朋友，也是在你没钱开饭时打救你的，
朋友，你闷得发慌时可以跟你一同发慌的，
朋友，会甘愿给功课你抄，跟你一同出猫一同被人罚的，
朋友，也是你买手信时，想买一份大的给他的，
朋友，也是你看见他上线时！

想要体会一年有多少价值，你可以去问一个失败重修的学生。
想要体会一月有多少价值，你可以去问一个不幸早产的母亲。
想要体会一周有多少价值，你可以去问一个定期周刊的编辑。
想要体会一小时有多少价值，你可以去问一对等待相聚的恋人。
想要体会一分钟有多少价值，你可以去问一个错过火车的旅人。
想要体会一秒钟有多少价值，你可以去问一个死里逃生的幸运儿。
想要体会一毫秒有多少价值，你可以去问一个错失金牌的运动员。

朋友就是……即使是一点小感动，一点小事情都想一起分享
朋友就是……当你抱头哭的时候，扶着你肩膀的那个人
朋友就是……当你面对人生挫折时，一直紧握你那双手
你好吗？

你能够看到他是你与他的缘份
你能够和你身边的人做朋友也是你与他的缘份
纵使你不知道这颗流星会何时消失
但如若你好好珍惜看到这流星的每一刻
那就算流星走了你也不会后悔
请大家好好珍惜身边的每一个人
珍惜这段友谊！

建立友谊如像种树，因为友谊是一株树
(TREE):
T:Trust(信任)
R:Respect(尊重)
E:Exchange(交流)
E:Emotional Support(精神支持)

朋友就是无形中伴你走过风雨，永远支持你的力量
朋友就是一种无法言喻的美好感觉
朋友就是在别人面
前永远护著你的那个人
朋友就是即使是一点小感动，一点小事情都想一起分享
朋友就是当你抱头痛哭的时候，扶著你肩膀的那个人
朋友就是当你面对人生挫折时，一直紧握你的那双手
喜欢下雨，因为你不会知道我流泪……


`

/**
 * 长文搜索组件，用于处理长文本的注音搜索。
 *
 * @param {Object} props - 组件属性。
 */
const LongSearch = (props) => {
  const { store } = useStore()
  const [searchDialectName, setSearchDialectName] = useState()
  const [searchedDialects, setSearchedDialects] = useState(store.dialectNames)
  const [selectedDialectName, setSelectedDialectName] = useState()
  const [textAreaValue, setTextAreaValue] = useState(string1)
  const [open, setOpen] = useState(false)

  const [form] = Form.useForm(); 
  const items = useMemo(() => {
    return [
      {
        key: '1',
        label: <Input value={searchDialectName} onChange={(e) => {
          const value = e?.target?.value ?? undefined
          console.log('e.', e, value)
          setSearchDialectName(value)
          if (value) {
            const _searchedDialects = store.dialectNames.filter(name => name.includes(value))
            setSearchedDialects(_searchedDialects)

          } else {
            setSearchedDialects(store.dialectNames)
          }
        }} />,
        disabled: true,
      },
      {
        type: 'divider',
      },
      ...searchedDialects.map(name => {
        return {
          key: name,
          label: name
        }
      })
    ]
  }, [
    searchDialectName,
    searchedDialects,
    store.dialectNames,
  ])

  const handleSelectMenu = ({ key }) => {
    console.log('key', key)
    setSelectedDialectName(key)
  }

  const handleTextareaChange = (e) => {
    const value = e?.target?.value
    setTextAreaValue(value)
  }

  const handleSearch = async () => {
    if (!selectedDialectName) {
      message.warning('请点击⚙设置按钮选择方言')
      return
    }
    NProgress.start();

    try {
      const chars = extractHanzi(textAreaValue)
      console.log('longCharList:', textAreaValue, chars)
      const result = await queryLongString({
        longCharList: chars,
        dialectName: selectedDialectName
      });
      console.log('result', result);
      setSearchData(result.data);
    } finally {
      NProgress.done();
    }

  }


  const handleModalOk = () => {
    const filterData = form.getFieldsValue()
    localStorage.setItem('filterData', JSON.stringify(filterData))
    console.log('filterData', filterData)
    setOpen(false)
    props.onSearch(value, true)
  }
  const handleModalCancel = () => {
    setOpen(false)
    
  }
  return (
    <>
      <div className={styles.search_bar}>
        <div className={styles.logo_block}><LogoBlock /></div>
        <Input.TextArea
          value={textAreaValue}
          placeholder="长文注音，单次查询限制1000字以内，只可选择一种语言，请在右侧设置按钮选择语言"
          showCount
          maxLength={1000}
          className={styles.textarea}
          autoSize={{ minRows: 4, maxRows: 10 }}
          styles={{
            count: {
              // border: '1px solid red',
              // position: 'relative',
              bottom: '2px',
              paddingRight: '5px'
            }
          }}
          onChange={handleTextareaChange}
        />
        <div className={styles.btn_box}>

          <button className={styles.setting_btn} onClick={() => setOpen(true)}>
            <img src={settingPng} alt="设置" />
          </button>
          <br />
          <button className={styles.search_btn} onClick={handleSearch}>搜索</button>
        </div>
      </div>
      <div className={styles.search_content}>
        {true ? (
          <div className={styles.search_content_main}>
            <Button type="link" style={{
              // position: 'absolute',
              // top: 0,
              // right: '-10px'
              padding: 0,
              paddingLeft: 0,
              paddingRight: 0,
              // border: '1px solid red',
              marginTop: -5,
              marginRight: -3,
              float: 'right'
            }}>复制</Button>
            {
              splitStringInto2DArray(textAreaValue).map((line, lineIndex) => {
                return <div key={`line${lineIndex}`}>
                  {
                    line.map((char, charIndex) => {
                      // return <span key={`line${lineIndex}char${charIndex}`}>{char}</span>
                      return <Char key={`line${lineIndex}char${charIndex}`} charInfos={[{
                        char: '壹',
                        phonetics: ['yi1', 'yat7']
                      }, {
                        char: '一',
                        phonetics: ['yi1', 'yat7', 'dzpanddg2', 'yi7']
                      }]} />
                    })
                  }
                </div>
              })
            }
          </div>
        ) : (
          <NoData />
        )}
      </div>

      <Dialog
        title="筛选"
        open={open}
        onOk={handleModalOk}
        onClose={handleModalCancel}
      >
        <Form form={form}>
          <Form.Item name="dialectName" label="选择语言" >
            <Select
              showSearch
              allowClear
              options={(store?.dialectNames ?? []).map(name => {
                return {
                  label: name,
                  value: name,
                }
              })}
            />
          </Form.Item>
        </Form>
      </Dialog>
    </>
  );
};

export default LongSearch;



