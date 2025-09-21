import { useState, useEffect } from "react";

let listeners = [];
let content = null;

function setModal({ active, content: newContent }) {
  content = newContent;
  listeners.forEach((setState) => setState({ active, content }))
}

export function useModalState() {

  const [state, setState] = useState({ active: false, content: null });

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((cb) => (cb.setState !== setState))
    }
  })

  return state;
}

export const modalController = {
  open: (jsxContent) => setModal({ active: true, content: jsxContent }),
  close: () => setModal({ active: false, content: null })
}