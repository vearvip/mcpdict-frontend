import { Avatar, List } from 'antd'
import React from 'react'
import styles from './index.module.less';
import { ExportOutlined } from '@ant-design/icons';

const informationList = [
  {
    title: '中国语言资源保护工程',
    url: 'https://zhongguoyuyan.cn/',
    logo: 'https://img.alicdn.com/imgextra/i3/O1CN0100EtdX1PLRRyBQTXG_!!6000000001824-2-tps-64-64.png',
    description: "“中国语言资源保护工程”是由中国财政部立项，教育部和国家语言文字工作委员会领导实施的一项特大型语言文化类国家工程。"
  },
  {
    title: '漢字音典官方APP',
    url: 'https://github.com/osfans/MCPDict/releases',
    logo: 'https://img.alicdn.com/imgextra/i1/O1CN012C4sFq1groux7zc8i_!!6000000004196-2-tps-192-192.png',
    description: '本程序源自漢字古今中外讀音查詢，現收錄了數百種語言（方言）的漢字讀音，使用國際音標注音，可查詢漢字在古今中外多種語言中的讀音及釋義，也能給語言學習者提供有限的幫助。'
  },
  {
    title: '韵典网',
    url: 'https://ytenx.org/',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN01eF8vws20lfv1wyZWs_!!6000000006890-1-tps-128-128.gif',
    description: '韻典網是一個綜合韻書查詢工具，包含廣韻、中原音韻、洪武正韻牋、分韻撮要和上古音系。'
  },
  {
    title: '汉典',
    url: 'https://www.zdic.net/',
    logo: 'https://img.alicdn.com/imgextra/i3/O1CN01RReFKV1H93oe1ooK0_!!6000000000714-73-tps-32-32.ico',
    description: '汉典是一个面向广泛受众、含有丰富及有益内容的教育和信息网站。'
  },
  {
    title: '古音小镜',
    url: 'http://www.kaom.net/',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN01VyhpKE1fNIucpsZ2o_!!6000000003994-2-tps-200-200.png',
    description: '這是一個歷史語言學材料和工具的共享站，主要用於探索漢語的早期歷史。鏡子原是便攜照容工具，這裡指電子查詢，取其方便之義。小站用業餘時間建設和修改，精力有限，錯誤很多，請大家注意鑒別。'
  },
  {
    title: '切韵音系自动推导器',
    url: 'https://nk2028.shn.hk/tshet-uinh-autoderiver/',
    logo: 'https://img.alicdn.com/imgextra/i2/O1CN01LoMKR61MDFW9R8zNY_!!6000000001400-2-tps-32-32.png',
    description: '切韻音系自動推導器由 nk2028 開發。我們開發有關語言學的項目，尤其是有關歷史漢語語音學，異體字和日語語言學的項目。'
  },
  {
    title: '康熙字典',
    url: 'https://www.kangxizidian.com/',
    logo: 'https://img.alicdn.com/imgextra/i1/O1CN01Emzea21Lbh2YLchDL_!!6000000001318-0-tps-635-636.jpg',
    description: '《康熙字典網上版》歡迎您！本站推出《康熙字典》已有十餘載，感謝全球各地網友的支持，讓我們仍有動力繼續努力！本站希望可以做到校對最完整的《康熙字典網上版》！'
  },
  {
    title: '汉语大词典',
    url: 'https://homeinmists.ilotus.org/hd/',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN01pYQdfa1GoRzeTwVFL_!!6000000000669-2-tps-768-644.png',
    description: '漢語大字典（第二版）共收錄 60,367 個漢字'
  },
  {
    title: '字海(叶典）',
    url: 'http://yedict.com/',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN01tEVLrD20jqKnWQGcr_!!6000000006886-73-tps-32-32.ico',
    description: '力争做到收字有据、查字便捷、释义准确'
  },
  {
    title: '教育部异体字字典（台湾）',
    url: 'http://dict.variants.moe.edu.tw/',
    logo: 'https://img.alicdn.com/imgextra/i2/O1CN01fGTCf41JlC1XDx6xX_!!6000000001068-73-tps-64-64.ico',
    description: '漢字歷史源遠流長，文字的形體除自身的演進之外，歷經抄寫、版刻、印刷、衍繹等流傳過程，必然產生複雜紛歧的現象。教育部為利國字教學、書寫溝通以及資訊發展，故而舉要治繁，訂定「正字」，樹立用字標準；隨後又為保存文字歷史，著手整理自古至今的字書文獻字形，以正字繫聯其他音義相同的異體寫法，總整成一部大型中文字形彙典，即為《異體字字典》。'
  },
  {
    title: '东方语言学',
    url: 'http://118.24.95.172/',
    logo: 'https://img.alicdn.com/imgextra/i1/O1CN01YEMXJ6252rExASeeH_!!6000000007469-1-tps-38-43.gif',
    description: '东方语言学主站是：“https://www.eastling.org”，现在看来貌似挂了，这里能访问的是旧版站点。'
  },
  {
    title: '小学堂',
    url: 'https://xiaoxue.iis.sinica.edu.tw/',
    logo: 'https://img.alicdn.com/imgextra/i3/O1CN01aBxpkk1pfIdD5dapg_!!6000000005387-73-tps-24-24.ico',
    description: '本資料庫由臺灣大學中國文學系、中央研究院歷史語言研究所、資訊科學研究所、數位文化中心共同開發'
  },
  {
    title: '漢語多功能字庫',
    url: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/',
    logo: 'https://img.alicdn.com/imgextra/i2/O1CN01vUq2VY1mcbSkHWDGb_!!6000000004975-2-tps-150-155.png',
    description: '「人文電算研究中心」在2014年推出了《漢語多功能字庫》，新增「古文字繫形」、「部件樹」、「形義通解」和「英漢索引」等功能，以支持漢語教育。至2018年，該字庫進行了重大更新，包括擴充「形義通解」內容，增加「其他方言讀音」、《說文解字》全文索引、「讀史方輿紀要」及「成語彙輯」等特色，持續致力於漢語漢字教育的基礎建設工作。'
  },

  
]

const Information = () => {
  return <div className={`box ${styles.information}`}>
    
  <List
    itemLayout="horizontal"
    dataSource={informationList}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.logo} />}
          title={<a target="_blank" href={item.url}>{item.title}<ExportOutlined style={{ marginLeft: 3 }} /></a>}
          description={item.description}
        />
      </List.Item>
    )}
  />
  </div>
}

export default Information
