import { useEffect } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key: string, action: () => void, deps: string[]) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action()
    }
    window.addEventListener('keydown', onKeyup);
    return () => window.removeEventListener('keydown', onKeyup);
  }, deps);
}