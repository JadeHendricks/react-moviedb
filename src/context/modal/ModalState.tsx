import React, { useCallback, useEffect, useMemo, useState, type ReactNode, type MouseEvent } from "react";
import ModalContext, { type ModalContextValue } from "./ModalContext";
const ModalState = (props: { children?: ReactNode }) => {
  const [activity, setActivity] = useState<string | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const closeModal = useCallback(() => setModalShow(false), []);
  // Escape closes the modal. The listener exists only while it is open and is removed on close and unmount (B3).
  // A click on the dimmed overlay is handled by the overlay's own onClick in Modal, not by a window listener.
  useEffect(() => {
    if (!modalShow) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalShow(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [modalShow]);
  const authSelection = useCallback((e: MouseEvent<HTMLElement>) => {
    const buttonClicked = (e.target as HTMLElement).getAttribute("data-auth");
    setModalShow(true);
    if (buttonClicked) setActivity(buttonClicked);
  }, []);
  const authFailure = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert("This will work in due time");
  }, []);
  // Memoized so consumers only re-render when the modal state changes (B25).
  const value = useMemo<ModalContextValue>(
    () => ({ authSelection, authFailure, closeModal, activity, modalShow }),
    [authSelection, authFailure, closeModal, activity, modalShow],
  );
  return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
};
export default ModalState;