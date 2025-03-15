import { useSearchParams } from "react-router";
import PageContainer from "./components/PageContainer";
import { string1 } from "./str";
import { queryDialectItemInfo } from "../../services";
import { useEffect, useMemo, useState } from "react";
import { TongYinZiBiao } from "../../utils/constant";
import MobilePageContainer from "./components/MobilePageContainer";
import { useMobile } from "../../utils/hooks";

export default () => {
  const [searchParams] = useSearchParams();
  const [dialectInfo, setDialectInfo] = useState()
  const isMobile =  useMobile()
  const dialectName = searchParams.get('dialectName') 
  const title = useMemo(() => {
    const pageTitle = (dialectName ?? '??') + TongYinZiBiao
    document.title = pageTitle;
    return pageTitle
  }, [ dialectName])


  function parseRimeString(input) {
    const lines = input.split("\n").filter((line) => line.trim());

    return lines.map((line) => {
      const parts = line.split("\t");

      // 处理首段，提取IPA和初始chars 'tsɿ[1]知蜘支枝'
      const ipa = parts[0].split("[")[0]
      const initialKey = parts[0].split("[")[1].split("]")[0]
      const firstChars = parts[0].split("[")[1].split("]")[1]
      const chars = {
        [initialKey]: firstChars.trim(),
      };

      // 处理后续各分段
      for (let i = 1; i < parts.length; i++) {
        const match = parts[i].match(/^\[(\d+)\] ?(.+)/);
        if (!match) continue;

        const [_, key, val] = match;
        chars[key] = val.trim();
      }

      return { ipa, chars };
    });
  }


  const getDialectItemInfo = async (dialectName) => { 
    try {
      const result = await queryDialectItemInfo({
        name: dialectName
      })
      setDialectInfo(result.data)
      // console.log('result', result.data)
    } catch (error) {
      console.error('❌ 查询方言信息失败:', error)
    } 
  }
  console.log('searchParams', searchParams)

  useEffect(() => {
    if (dialectName) {
      getDialectItemInfo(dialectName)
    }
  }, [dialectName]) 

  const Container = isMobile ? MobilePageContainer : PageContainer

  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        fontFamily: "'FangSong', '仿宋', serif",
        fontSize: 18,
        paddingTop: isMobile ? 0 : 20,
      }}
    >
      <Container title={title}>
        {parseRimeString(dialectInfo?.[TongYinZiBiao] ?? '').map((item, itemIndex) => {
          const key = item.ipa + itemIndex;
          return (
            <div key={key}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  padding: "20px 0 0 0",
                  // border: '1px solid red'
                }}
              >
                {item.ipa}
              </div>
              {Object.keys(item.chars).map((tone) => {
                const words = item.chars[tone];
                const subKey = itemIndex + tone + words;
                return (
                  <div key={subKey}>
                    [{tone}]<span style={{ marginLeft: 5 }}>{words}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Container>
    </div>
  );
};
