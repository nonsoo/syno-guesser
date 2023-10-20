import { useState, useCallback, useEffect } from "react";

import type { useAlertType } from "../types/hookTypes";

const useAlert: useAlertType = (timeOut = 3000) => {
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
