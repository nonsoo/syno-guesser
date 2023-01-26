import { forwardRef, ReactNode, ForwardedRef } from "react";
import styles from "../styles/Instructions.module.css";

import { IoClose } from "react-icons/io5";

interface Props {
  onToggle: () => void;
  children: ReactNode;
}

const Instruc = forwardRef(function Instruc(
  { onToggle, children }: Props,
  ref: ForwardedRef<HTMLElement>
) {
  return (
    <section className={styles.ModalBackground}>
      <section className={styles.Modal} ref={ref}>
        <IoClose
          className={styles.Modal__closeBtn}
          onClick={onToggle}
          data-testid="instruct_Close_btn"
        />
        {children}
      </section>
    </section>
  );
});

export default Instruc;
