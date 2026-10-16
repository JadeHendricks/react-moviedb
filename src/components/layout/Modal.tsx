import React, {useContext} from 'react';
import '../../styles/organisms/modal.scss';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/label.scss';
import '../../styles/molecules/field.scss';
import '../../styles/atoms/button.scss';
import PasswordField from "./PasswordField";
import ModalContext from "../../context/modal/ModalContext";

function Modal() {

  const modalContext = useContext(ModalContext);
  const {authSelection, closeModal, activity, authFailure} = modalContext;

  // Only a click on the dimmed backdrop itself closes it, not one inside the modal (B3).
  return (
    <div className="modal" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal__dialog">
          <div className="modal__tabs">
              <button className={activity === "login" ? "modal__tab modal__tab--active" : "modal__tab"} data-auth="login" onClick={authSelection}>Login</button>
              <button className={activity === "signup" ? "modal__tab modal__tab--active" : "modal__tab"} data-auth="signup" onClick={authSelection}>Sign up</button>
          </div>
          <div className="modal__padding">
              <p className="modal__slug">Enter your email and password to <strong>sign in</strong></p>
          </div>
          <div className="modal__form">
          
              {activity === "login" ? <div className="modal__login">
                  <div className="field">
                      <label id="signup_email" className="label label--caps">Email *</label>
                      <input type="text" name="signup_email" className="input input--plain" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <PasswordField labelId="signup_password" name="signup_password" label="Password *" placeholder="Password" />
              </div> : ""}

              {activity === "signup" ? <div className="modal__signup">
                  <div className="field">
                      <label id="login_email" className="label label--caps">Email *</label>
                      <input type="text" name="login_email" className="input input--plain" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <PasswordField labelId="login_password" name="login_password" label="Password *" placeholder="Password" />
                  <PasswordField labelId="login_confirmpassword" name="login_confirmpassword" label="Confirm Password *" placeholder="Confirm Password" boxClassName="field--flush-top" />
              </div> : ""}

              <div className="modal__padding">
                  {activity === "login" ? <button className="button button--green modal__submit" type="submit" onClick={authFailure}>Login</button> : ""}
                  {activity === "signup" ? <button className="button button--green modal__submit" type="submit" onClick={authFailure}>Sign up</button> : ""}
                  {/* <span className="auth-label paddingBottom30">this is an auth message</span> */}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Modal;