import { useRef, useEffect } from "react";

type handlerFunc = () => void;
const useOnClickOutside = (handler: handlerFunc) => {
  const refNode = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const element = refNode.current;
      if (!element || element.contains((event?.target as Node) || null)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return refNode;
};

export default useOnClickOutside;
