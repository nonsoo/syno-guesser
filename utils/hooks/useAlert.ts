import { useState, useCallback, useEffect } from "react";

export const useAlert = (timeOut = 3000): [boolean, () => void] => {
  const [result, setResult] = useState(false);

  const alertFn = useCallback(() => {
    setResult(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timer;
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
