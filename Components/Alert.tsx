import styles from "@/styles/Alert.module.css";

import { MdOutlineErrorOutline } from "react-icons/md";

interface Props {
  notification: string;
}
const Alert = ({ notification }: Props) => {
  return (
    <section className={styles.Alert}>
      <MdOutlineErrorOutline className={styles.Alert__Icon} />
      <p className={styles.Alert__Name}>{notification}</p>
    </section>
  );
};

export default Alert;
