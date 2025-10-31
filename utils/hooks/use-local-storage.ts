import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, initValue: T) => {
  const isBrowser = typeof window !== "undefined";
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!isBrowser) return;

    const storedValue = localStorage.getItem(key);
    setState(storedValue ? JSON.parse(storedValue) : initValue);
  }, [key, isBrowser]);

  useEffect(() => {
    if (state !== undefined && isBrowser) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isBrowser]);

  return [state ?? initValue, setState] as const;
};

export default useLocalStorage;
