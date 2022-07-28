import React from "react";
import styles from './index.module.less'

export interface Props {
  name: string;
}

const Greeting = ({ name }: Props) => {
  return (
    <div className={styles.not_found}>
      404
    </div>
  );
};

export default Greeting;
