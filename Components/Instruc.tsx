import { FC, ReactNode } from "react";
import styles from "../styles/Instructions.module.css";

import { IoClose } from "react-icons/io5";

interface Props {
  onToggle: () => void;
  children: ReactNode;
}

const Instruc: FC<Props> = ({ onToggle, children }) => {
  return (
    <section className={styles.ModalBackground}>
      <section className={styles.Modal}>
        <IoClose
          className={styles.Modal__closeBtn}
          onClick={onToggle}
          data-testid="instruct_Close_btn"
        />
        {children}
      </section>
    </section>
  );
};

export default Instruc;
