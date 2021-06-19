import { useEffect } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useUndo(action: () => void, deps: string[]) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
            action();
        }
    }
    window.addEventListener('keydown', onKeyup);
    return () => window.removeEventListener('keydown', onKeyup);
  }, deps);
}