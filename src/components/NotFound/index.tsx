import React from "react";
import _404 from '@/assets/404.svg'
import styles from './index.module.less'

export interface Props {
  name: string;
}

const Greeting = ({ name }: Props) => {
  return (
    <div className={styles.not_found}>
      <span className={styles.title}>对不起，页面未找到</span>
      <img className={styles.svg} src={_404 as any} />
    </div>
  );
};

export default Greeting;
