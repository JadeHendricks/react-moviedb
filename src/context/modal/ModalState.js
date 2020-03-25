import React, {useReducer} from "react";
import ModalContext from './ModalContext';
import ModalReducer from './ModalReducer';
import { 
  MODAL_VISIBILITY,
  SET_ACTIVITY } from '../types';

const ModalState = props => {

  const initialState = {
    activity: null,
    modalShow: false
  };

  const [state, dispatch] = useReducer(ModalReducer, initialState);


  const authSelection = (e) => {
    const buttonClicked = e.target.getAttribute("data-auth");

    dispatch({
      type: MODAL_VISIBILITY,
      payload: true
    })

    buttonClicked && dispatch({
      type: SET_ACTIVITY,
      payload: buttonClicked
    });
  }

  const closeModal = (e) => {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        dispatch({
          type: MODAL_VISIBILITY,
          payload: false
        })
      }
      return;
    });
  }

  const authFailure = (e) => {
    e.preventDefault();
    alert("This will work in due time")
  }

  const showPassword = (e) => {
    const eyeElement = e.currentTarget.children[0];
    const passwordInput = e.currentTarget.previousSibling;
    
    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
      eyeElement.setAttribute("xlink:href", "/static/media/sprite.12eb0e28.svg#icon-eye-blocked")
    } else {
      passwordInput.setAttribute("type", "password");
      eyeElement.setAttribute("xlink:href", "/static/media/sprite.12eb0e28.svg#icon-eye")
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