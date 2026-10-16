import React, { useCallback, useEffect, useMemo, useState, type ReactNode, type MouseEvent } from "react";
import ModalContext, { type ModalContextValue } from "./ModalContext";
import svgAsset from "../../images/sprite.svg";

const ModalState = (props: { children?: ReactNode }) => {
  const [activity, setActivity] = useState<string | null>(null);
  const [modalShow, setModalShow] = useState(false);

  // One window listener, only while the modal is open, removed on close and unmount (B3).
  // A click on the dimmed overlay closes the modal, as before.
  useEffect(() => {
    if (!modalShow) return;
    const closeOnOverlayClick = (e: globalThis.MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("overlay")) {
        setModalShow(false);
      }
    };
    window.addEventListener("click", closeOnOverlayClick);
    return () => window.removeEventListener("click", closeOnOverlayClick);
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

  const showPassword = useCallback((e: MouseEvent<SVGSVGElement>) => {
    // The icon is the first child and the input is the previous sibling in the Modal markup.
    const eyeElement = e.currentTarget.children[0]!;
    const passwordInput = e.currentTarget.previousSibling as HTMLInputElement;
    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
      eyeElement.setAttribute("href", `${svgAsset}#icon-eye-blocked`);
    } else {
      passwordInput.setAttribute("type", "password");
      eyeElement.setAttribute("href", `${svgAsset}#icon-eye`);
    }
  }, []);

  // Memoized so consumers only re-render when the modal state changes (B25).
  const value = useMemo<ModalContextValue>(
    () => ({ authSelection, showPassword, authFailure, activity, modalShow }),
    [authSelection, showPassword, authFailure, activity, modalShow],
  );

  return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
};

export default ModalState;
