import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import SearchInput from "@/components/SearchInput";
import logo from "@/assets/logo.png";
import logoText from "@/assets/logo_text.png";
import { Skeleton } from 'antd';
import request from '@/utils/request'
import { Zi } from './types';

// import { useSize } from 'ahooks'; 

const Search = (props: any) => {
  // console.log('props', props)
  const [loading, setLoading] = useState(true)
  const [searchData, setSearchData] = useState<Zi[]>([])

  const onSearch = async value => {
    console.log('value------', value)
    setLoading(true)
    setSearchData([])
    try {
      const ret: {
        data: Zi[]
      } = await request({
        url: 'https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/ok'
      })
      // console.log({ret})
      setSearchData(ret.data) 
    } catch (error) {
      console.error(error) 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSearchData(props?.ssrSearchData ?? [])
  }, [props.ssrSearchData])


  return <React.Fragment>
    {/* {searchContentSize} */}
    <div className={styles.search_bar}>
      <div className={styles.logo_box}>
        <img className={styles.logo} src={logo as any} />
        <img className={styles.logo_text} src={logoText as any} />
      </div>
      <SearchInput
        defaultValue={props?.searchParams?.q}
        onSearch={onSearch}
        style={{
          width: '100%',
          // margin: '0 auto',
          // maxWidth: '100%'
          // marginLeft: 20
        }} />
      {/* {searchContentSize} */}
    </div>
    <div className={styles.search_content}>
      <div className={styles.left_box}>
        {
          searchData.length === 0
            ? <>
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
            </>
            : <div>
              {
                searchData.map((ziItem, ziIndex) => {
                  return <React.Fragment key={'ziIndex' + ziIndex}>
                    <h1>{ziItem.zi}</h1>
                    {
                      ziItem.fangyan.map((fangyanItem, fangyanIndex) => {
                        return <div key={'fangyanIndex' + fangyanIndex}>
                          <h2 style={{ display: 'inline-block' }}>{fangyanItem.mingzi}</h2>
                          {
                            fangyanItem.yin.map((yinItem, yinIndex) => {
                              return <React.Fragment key={'yinIndex' + yinIndex}>
                                <h4 style={{ display: 'inline-block' }}>{yinItem.shengmu + yinItem.yunmu}</h4> 
                              </React.Fragment>
                            })
                          }
                          
                        </div>
                      })
                    }
                  </React.Fragment>
                })
              }
            </div>
        }
      </div>
      <div className={styles.right_box}>
        {
          searchData.length === 0
            ? <>
              <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
              <Skeleton active={loading} />
            </>
            : <div>
            {
              searchData.map((ziItem, ziIndex) => {
                return <React.Fragment key={'ziIndex' + ziIndex}>
                  <img src={ziItem.zitu} style={{ width: 100 }} /> 
                  <pre style={{
                    wordBreak: 'break-all'
                  }}>{ ziItem.xinhuashiyi }</pre>
                  {/* <div dangerouslySetInnerHTML={{ __html:ziItem.xinhuashiyi.replace(/\n/g,'\<br\/\>')  }}> </div>  */}
                </React.Fragment>
              })
            }
            </div>
        }
      </div>
    </div>

  </React.Fragment>
}

Search.getInitialProps = async (ctx) => {
  // console.log('ctx', ctx.query)
  if (!ctx?.query?.q) {
    return {}
  }
  try {
    const ret: {
      data: Zi[]
    } = await request({
      url: 'https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/ok'
    })
    // console.log({ret})
    return {
      ssrSearchData: ret.data
    }
  } catch (error) {
    // console.error(error)
    return {}
  }
}

export default Search