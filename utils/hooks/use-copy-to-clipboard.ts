import { useState, useCallback, useEffect } from "react";

const useCopyToClipboard = (
  timeOut = 3000
): [boolean, (copyText: string) => Promise<void>] => {
  const [result, setResult] = useState(false);

  const copyFn = useCallback(async (copyText: string) => {
    try {
      await navigator.clipboard.writeText(copyText);
      setResult(true);
    } catch {
      setResult(false);
    }
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

  return [result, copyFn];
};

export default useCopyToClipboard;
