import React, { useState, useEffect } from 'react';
import { Input, Radio } from 'antd';
import { Filter, getLocalFilterData, setLocalFilterData } from '../Filter';
import { unicodeLengthIgnoreSequence } from '@vearvip/hanzi-utils';
import { getSearchDialectList, parseSplitStr } from '../../utils';
import { queryChars } from '../../services';
import useStore from '@/store';
import { JianCheng } from '../../utils/constant';
import { useAsyncEffect } from 'ahooks';
import { useNavigate, useSearchParams } from 'react-router';
import styles from './index.module.less';

const MapFilter = ({ 
  onSearchResultChange,
  onRadioValueChange,
  defaultValue = ''
}) => {
  const { store } = useStore();
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [radioValue, setRadioValue] = useState();
  const [formData, setFormData] = useState(getLocalFilterData());
 

  // 处理 Filter 变化
  const handleFilterChange = allValues => {
    // console.log('allValues', allValues);
    setLocalFilterData(allValues);
    setFormData(allValues);
    setSearchResult([]);
    onSearchResultChange?.([]);
  };

  // 处理输入变化
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  // 处理搜索
  const handleSearch = () => {

    const q = searchParams.get('q');
    if (inputValue === q) {
      search(inputValue);
    } else {
      navigate(`/map?q=${inputValue}`, { replace: true });
    }
  };

  // 处理单选变化
  const handleRadioChange = (e) => {
    console.log('e', e);
    setRadioValue(e.target.value);
    onRadioValueChange?.(e.target.value);
  };

  // 带参数的搜索函数
  const search = async (inputVal) => {
    if (!inputVal) {
      setSearchResult([]);
      return;
    }

    let dialectList = getSearchDialectList(formData, store.dialectCateTree, store.dialectDistrictTree);
    setLoading(true);
    try {
      const result = await queryChars({
        charList: [inputVal],
        dialectList
      });
      const searchResult = (result?.data?.data ?? []).map(ele => {
        return {
          ...ele,
          value: ele.char,
          label: ele.char,
        }
      });
      setSearchResult(searchResult);
      if (searchResult.length > 0) {
        setRadioValue(searchResult[0].value);
        onRadioValueChange?.(searchResult[0].value);
      }
      onSearchResultChange?.(searchResult);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理 URL 参数变化和初始化
  useAsyncEffect(async () => {
    const q = searchParams.get('q');
    if (q) {
      if (
        !store.dialectInfos
        || !Array.isArray(store.dialectInfos)
        || store.dialectInfos.length === 0
      ) {
        console.warn('⚠️ dialectInfos 尚未准备好')
        return
      }
      // 设置输入值，自动搜索一次
      setInputValue(q);
      search(q);
    } else {
      setSearchResult([]);
      onSearchResultChange?.([]);
    }
  }, [searchParams, store]);

  // 初始化时设置默认值
  useEffect(() => {
    if (defaultValue !== undefined && inputValue !== defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={styles.mapFilter}>
      <Filter onChange={handleFilterChange} hiddenQueryType />
      <Input.Search
        value={inputValue}
        placeholder="请输入单字"
        loading={loading}
        enterButton
        count={{ 
          // 最大字符数，不同于原生 `maxLength`，超出后标红但不会截断
          max: 1,
          // 自定义字符计数，例如标准 emoji 长度大于 1，可以自定义计数策略将其改为 1 
          strategy: (value) => { 
            return unicodeLengthIgnoreSequence(value)
          }, 
          // 当字符数超出 `count.max` 时的自定义裁剪逻辑，不配置时不进行裁剪
          exceedFormatter: (value, config) => { 
            let segments = new Intl.Segmenter().segment(value); 
            const hanziList = [...segments].slice(0, config.max) 
            return hanziList.map(ele => ele.segment).join('')
          }
        }}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={searchResult}
        value={radioValue}
        onChange={handleRadioChange}
        style={{
          marginTop: 25
        }}
      />
    </div>
  );
};

export default MapFilter; 