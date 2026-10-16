import React, {useContext} from 'react';
import PasswordField from "./PasswordField";
import ModalContext from "../../context/modal/ModalContext";

function Modal() {

  const modalContext = useContext(ModalContext);
  const {authSelection, closeModal, activity, authFailure} = modalContext;

  // Only a click on the dimmed backdrop itself closes it, not one inside the modal (B3).
  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
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
                  <PasswordField labelId="signup_password" name="signup_password" label="Password *" placeholder="Password" />
              </div> : ""}

              {activity === "signup" ? <div className="modalForm__signup">
                  <div className="inputbox__box">
                      <label id="login_email" className="inputbox__label">Email *</label>
                      <input type="text" name="login_email" className="inputbox__input" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <PasswordField labelId="login_password" name="login_password" label="Password *" placeholder="Password" />
                  <PasswordField labelId="login_confirmpassword" name="login_confirmpassword" label="Confirm Password *" placeholder="Confirm Password" boxClassName="borderTop0" />
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