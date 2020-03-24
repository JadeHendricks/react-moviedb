import React, {useContext, useEffect} from 'react';
import svgAsset from "../../images/sprite.svg";
import ModalContext from "../../context/modal/ModalContext";

function Modal() {

  const modalContext = useContext(ModalContext);
  const {authSelection, activity, closeModal, authFailure} = modalContext;

  useEffect(() => {
    closeModal();

    return () => {
        clearTimeout(closeModal);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="overlay">
      <div className="modal modalAuth">
          <div className="modalAuth__tabs">
              <button className={activity === "login" ? "tab active" : "tab"} data-auth="login" onClick={authSelection}>Login</button>
              <button className={activity === "signup" ? "tab active" : "tab"} data-auth="signup" onClick={authSelection}>Sign up</button>
          </div>
          <div className="modalAuth__padding">
              <p className="modalAuth__slug">Enter your email and password to <strong>sign in</strong></p>
          </div>
          <div className="modalForm inputbox">
          
              {activity === "login" ? <div className="modalForm__login">
                  <div className="inputbox__box">
                      <label id="signup_email" className="inputbox__label">Email *</label>
                      <input type="text" name="signup_email" className="inputbox__input" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <div className="inputbox__box">
                      <label id="signup_password" className="inputbox__label">Password *</label>
                      <input type="text" name="signup_password" className="inputbox__input" placeholder="Password" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                      <svg className="modalForm__icon">
                          <use xlinkHref={`${svgAsset}#icon-eye`}></use>
                      </svg>
                  </div>
              </div> : ""}

              {activity === "signup" ? <div className="modalForm__signup">
                  <div className="inputbox__box">
                      <label id="login_email" className="inputbox__label">Email *</label>
                      <input type="text" name="login_email" className="inputbox__input" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <div className="inputbox__box">
                      <label id="login_password" className="inputbox__label">Password *</label>
                      <input type="password" name="login_password" className="inputbox__input" placeholder="Password" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                      <svg className="modalForm__icon">
                          <use xlinkHref={`${svgAsset}#icon-eye`}></use>
                      </svg>
                  </div>
                  <div className="inputbox__box borderTop0">
                      <label id="login_confirmpassword" className="inputbox__label">Confirm Password *</label>
                      <input type="password" name="login_confirmpassword" className="inputbox__input" placeholder="Confirm Password" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                      <svg className="modalForm__icon">
                          <use xlinkHref={`${svgAsset}#icon-eye`}></use>
                      </svg>
                  </div>
              </div> : ""}

              <div className="modalAuth__padding">
                  {activity === "login" ? <button className="button button--green" type="submit" onClick={authFailure}>Login</button> : ""}
                  {activity === "signup" ? <button className="button button--green" type="submit" onClick={authFailure}>Sign up</button> : ""}
                  {/* <span className="auth-label paddingBottom30">this is an auth message</span> */}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Modal;