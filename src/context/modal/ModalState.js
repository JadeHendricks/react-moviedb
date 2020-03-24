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

  return (
    <ModalContext.Provider value={{
      authSelection,
      closeModal,
      activity: state.activity,
      modalShow: state.modalShow
    }}>
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalState;