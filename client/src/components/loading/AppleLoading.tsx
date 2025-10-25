import React from 'react';
import styles from './css/AppleLoading.module.css';

interface AppleLoadingProps {
  message?: string;
}

const AppleLoading: React.FC<AppleLoadingProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.appleWrapper}>
        <div className={styles.appleBody}></div>
        <div className={styles.appleStem}></div>
        <div className={styles.appleLeaf}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AppleLoading;
