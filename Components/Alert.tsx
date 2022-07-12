import { FC } from "react";
import styles from "../styles/Alert.module.css";

import { MdOutlineErrorOutline } from "react-icons/md";

const Alert: FC = () => {
  return (
    <section className={styles.Alert}>
      <MdOutlineErrorOutline className={styles.Alert__Icon} />
      <p className={styles.Alert__Name}>Not in word list</p>
    </section>
  );
};

export default Alert;
