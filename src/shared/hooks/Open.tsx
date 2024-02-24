import { useState } from "react";

export function useOpen(init?: boolean) {
  if (init === undefined) {
    init = false;
  }
  const [isOpen, setIsOpen] = useState(init);
  
  function close() {
    setIsOpen(false);
  }
  
  function open() {
    setIsOpen(true);
  }
  
  function toggle() {
    setIsOpen(!isOpen);
  }
  
  return { isOpen, open, close, toggle };
}
