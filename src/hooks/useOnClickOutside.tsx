import * as React from "react";

type THandler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: THandler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    return () => {
      document.removeEventListener(mouseEvent, listener);
    };
  }, [ref, handler, mouseEvent]);
}
