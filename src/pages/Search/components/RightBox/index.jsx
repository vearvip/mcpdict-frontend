import React from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module
import Skeleton from "@/components/Skeleton";
import { makeBr } from "@/utils";

/**
 * 右侧盒子组件，用于展示搜索数据。 
 */
const RightBox = (props) => {
  const { searchData } = props;

  console.log('searchData', searchData);

  return (
    <>
      <div className={styles.right_box}>
        {searchData.length > 0 ? (
          searchData.map((ziItem, index) => (
            <div key={index} className={styles.zi_box}>
              <img src={ziItem.zitu} className={styles.zitu} alt="字符图" />
              <div dangerouslySetInnerHTML={{ __html: makeBr(ziItem.xinhuashiyi) }}></div>
            </div>
          ))
        ) : (
          <>
            {/* <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
            <Skeleton active={loading} /> */}
            右侧空白
          </>
        )}
      </div>
    </>
  );
};

export default RightBox;



