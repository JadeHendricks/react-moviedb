import React, {useReducer, type ReactNode, type MouseEvent} from "react";
import ModalContext from './ModalContext';
import ModalReducer, { type ModalStateShape } from './ModalReducer';
import svgAsset from "../../images/sprite.svg";
import { 
  MODAL_VISIBILITY,
  SET_ACTIVITY } from '../types';

const ModalState = (props: { children?: ReactNode }) => {
  const initialState: ModalStateShape = {
    activity: null,
    modalShow: false
  };
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const authSelection = (e: MouseEvent<HTMLElement>) => {
    const buttonClicked = (e.target as HTMLElement).getAttribute("data-auth");
    dispatch({
      type: MODAL_VISIBILITY,
      payload: true
    })
    buttonClicked && dispatch({
      type: SET_ACTIVITY,
      payload: buttonClicked
    });
  }

  const closeModal = () => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).classList.contains("overlay")) {
        dispatch({
          type: MODAL_VISIBILITY,
          payload: false
        })
      }
      return;
    });
  }

  const authFailure = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert("This will work in due time")
  }

  const showPassword = (e: MouseEvent<SVGSVGElement>) => {
    // The icon is the first child and the input is the previous sibling in the Modal markup.
    const eyeElement = e.currentTarget.children[0]!;
    const passwordInput = e.currentTarget.previousSibling as HTMLInputElement;
    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
      // Sprite URL comes from the bundler; the old hard-coded CRA path (/static/media/sprite.<hash>.svg) no longer exists.
      eyeElement.setAttribute("href", `${svgAsset}#icon-eye-blocked`)
    } else {
      passwordInput.setAttribute("type", "password");
      eyeElement.setAttribute("href", `${svgAsset}#icon-eye`)
    }
  }

  return (
    <ModalContext.Provider value={{
      authSelection,
      showPassword,
      closeModal,
      authFailure,
      activity: state.activity,
      modalShow: state.modalShow
    }}>
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalState;
