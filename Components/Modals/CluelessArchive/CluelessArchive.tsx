import { Suspense } from "react";

import { X } from "lucide-react";

import styles from "@/styles/CluelessArchive.module.css";
import { CLUELESS_ARCHIVE_MODAL_ID } from "@/utils/constants/id-constants";

import DateForm from "./DateForm";

const CluelessArchive = () => {
  return (
    <section
      className={styles.Modal}
      id={CLUELESS_ARCHIVE_MODAL_ID}
      popover="auto"
    >
      <button
        className={styles.Modal__closeBtn}
        popoverTarget={CLUELESS_ARCHIVE_MODAL_ID}
        popoverTargetAction="hide"
      >
        <X size={30} />
      </button>

      <p className={styles.Modal__Title}>Clueless Archive</p>
      <p className={styles.Modal__Description}>Play through past challenges!</p>

      <Suspense>
        <DateForm theme="random-list" />
      </Suspense>
    </section>
  );
};

export default CluelessArchive;
