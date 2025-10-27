import type { UseAlertType } from "../types/hookTypes";

import { useState, useCallback, useEffect } from "react";

const useAlert: UseAlertType = (timeOut = 3000) => {
  const [result, setResult] = useState(false);

  const alertFn = useCallback(() => {
    setResult(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (result) {
      timer = setTimeout(() => setResult(false), timeOut);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeOut, result]);

  return [result, alertFn];
};

export default useAlert;
