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
import { groupVariants, parseSplitStr, splitStringInto2DArray } from '../../utils';
import Char from './components/Char';
import Dialog from '../../components/Dialog';
import { showFilterDialog } from '../../components/Filter';


let string1 = `忙的时候，想要休息；
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
因为你我有缘份，才能成为朋友`

/**
 * 长文搜索组件，用于处理长文本的注音搜索。
 *
 * @param {Object} props - 组件属性。
 */
const LongSearch = (props) => {
  const { store } = useStore()
  const [originTextAreaValue, setOriginTextAreaValue] = useState()
  const [textAreaValue, setTextAreaValue] = useState()

  const [filterData, setFilterData] = useState(JSON.parse(localStorage.getItem('filterData') || '{}'))
  const [charVariantInfos, setCharVariantsInfos] = useState()
  const [form] = Form.useForm();


  const handleTextareaChange = (e) => {
    const value = e?.target?.value
    setOriginTextAreaValue(value)
  }

  const handleClickSetting = () => {
    showFilterDialog({
      tmpMode: true,
      onOk(filterData) {
        setFilterData({
          ...filterData
        })
        handleSearch(filterData)
      }
    })
  }

  const handleSearch = async (filterData) => {
    if (!filterData?.dialectName) {
      message.warning('请点击⚙设置按钮选择方言')
      return
    }
    NProgress.start();

    try {
      const chars = extractHanzi(originTextAreaValue)
      // console.log('charList:', originTextAreaValue, chars)
      const result = await queryLongString({
        charList: chars,
        dialectName: filterData.dialectName
      });
      const charGroupList = groupVariants(chars, result.variants)
      // console.log('charGroupList', charGroupList);
      const charVariantInfos = []
      charGroupList.forEach(charGroup => {
        const variants = charGroup.variants
        const charInfos = []
        variants.forEach(variant => {
          if (result.data[variant]) {
            charInfos.push({
              char: variant,
              phonetics: parseSplitStr(result.data[variant]).map(item => item.phonetic)
            })
          }
        })
        charVariantInfos.push({
          char: charGroup.char,
          charInfos: charInfos
        })
      })
      setCharVariantsInfos(charVariantInfos)
      setTextAreaValue(originTextAreaValue)
      // console.log('charVariantInfos', charVariantInfos)
    } catch (e) {
      if (!originTextAreaValue) {
        setCharVariantsInfos(undefined)
      }
    } finally {
      NProgress.done();
    }

  }


  const handleModalOk = () => {
    const filterData = form.getFieldsValue()
    localStorage.setItem('filterData', JSON.stringify(filterData))
    // console.log('filterData', filterData)
    props.onSearch(value, true)
  }
  const handleModalCancel = () => {

  }
  return (
    <>
      <div className={styles.search_bar}>
        <div className={styles.logo_block}><LogoBlock /></div>
        <Input.TextArea
          value={originTextAreaValue}
          maxLength={300}
          placeholder="长文注音，单次查询限制300字以内，只可选择一种语言，请在右侧设置按钮选择语言"
          showCount
          // className={styles.textarea}
          autoSize={{ minRows: 4, maxRows: 10 }}
          style={{
            width: '650px'
          }}
          styles={{
            count: {
              // border: '1px solid red',
              // position: 'relative',
              bottom: '2px',
              paddingRight: '5px'
            }
          }}
          onChange={handleTextareaChange} />
        <div className={styles.btn_box}>
          <button className={styles.setting_btn} onClick={() => handleClickSetting()}>

            <img src={settingPng} alt="设置" />
          </button>
          <br />
          <button className={styles.search_btn} onClick={() => handleSearch(filterData)}>搜索</button>
        </div>
        {/* <div className={styles.dialect_name_tag}>
          {filterData?.dialectName ?? '未選擇'}
        </div> */}
      </div>
      <div className={styles.search_content} id="search_content">
        {charVariantInfos ? (
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
            }} onClick={() => {
              function copyDivToClipboard(divId) {
                // 获取指定的 div 元素
                var div = document.getElementById(divId);

                // 创建一个临时的 textarea 元素用于复制文本
                var textarea = document.createElement("textarea");
                textarea.style.position = 'fixed';  // 防止滚动条出现
                textarea.style.top = 0;
                textarea.style.left = 0;
                textarea.style.width = '2em';
                textarea.style.height = '2em';
                textarea.style.padding = 0;
                textarea.style.border = 'none';
                textarea.style.outline = 'none';
                textarea.style.boxShadow = 'none';
                textarea.style.background = 'transparent';
                textarea.value = div.textContent.replace('复制', '');

                document.body.appendChild(textarea);
                textarea.select();  // 选择 textarea 中的内容

                try {
                  var successful = document.execCommand('copy');
                  var msg = successful ? '成功' : '失败';
                  console.log('复制到剪贴板 ' + msg);
                } catch (err) {
                  console.error('无法复制文本: ', err);
                }

                document.body.removeChild(textarea);  // 移除临时的 textarea
              }
              // console.log('charInfos', splitStringInto2DArray(originTextAreaValue))
              copyDivToClipboard('search_content')
            }}>复制</Button>
            {
              textAreaValue ? splitStringInto2DArray(textAreaValue).map((line, lineIndex) => {
                return <div key={`line${lineIndex}`}>
                  {
                    line.map((char, charIndex) => {
                      const charInfos = charVariantInfos.find((info) => info.char === char)?.charInfos
                      return charInfos ? <Char key={`line${lineIndex}char${charIndex}`} charInfos={charInfos} /> : null
                    })
                  }
                </div>
              }) : null
            }
          </div>
        ) : (
          <NoData />
        )}
      </div>

    </>
  );
};

export default LongSearch;



