import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Focus handling for a modal dialog that is mounted only while it is open:
 *  - focus moves into the dialog when it opens,
 *  - Tab and Shift+Tab stay inside it (spread `onKeyDown` on an ancestor of the dialog),
 *  - focus goes back to whatever opened it when it closes.
 * Escape is handled by the modal state, which already owns the open flag.
 */
export function useDialogFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    ref.current?.focus();
    return () => {
      // The opener can be gone by then (e.g. a route change), in which case there is nothing to return to.
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Tab' || !ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) {
      e.preventDefault();
      return;
    }
    const active = document.activeElement;
    // From the dialog itself (where focus starts) or past either end, wrap around.
    if (e.shiftKey && (active === first || active === ref.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    } else if (active === ref.current) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return { ref, onKeyDown };
}
