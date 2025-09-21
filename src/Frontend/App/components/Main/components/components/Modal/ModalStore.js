import { useState, useEffect } from "react";

let listeners = [];
let modalState = null;

function setModal({ active, Component }) {

  if(active){
    document.body.classList.add('no-scroll');
  }else{
    document.body.classList.remove('no-scroll');
  }

  modalState = { active, Component }
  listeners.forEach((setState) => setState(modalState))
}

export function useModalState() {

  const [state, setState] = useState({ active: false, Component: null });

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((cb) => (cb.setState !== setState))
    }
  })

  return state;
}

export const modalController = {
  /**
   * 
   * @param {function} Component - a function for the component (not "<YourComponent/>" but just "YourComponent")
   * @returns modal with your component
   */
  open: (Component) => setModal({ active: true, Component }),
  close: () => setModal({ active: false, Component: null })
}