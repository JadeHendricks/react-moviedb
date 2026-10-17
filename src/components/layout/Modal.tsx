import React, {useContext} from 'react';
import '../../styles/organisms/modal.scss';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/label.scss';
import '../../styles/molecules/field.scss';
import '../../styles/atoms/button.scss';
import PasswordField from "./PasswordField";
import ModalContext from "../../context/modal/ModalContext";
import { useDialogFocus } from "../../hooks/useDialogFocus";

function Modal() {
  const modalContext = useContext(ModalContext);
  const {authSelection, closeModal, activity, authFailure} = modalContext;
  const { ref, onKeyDown } = useDialogFocus<HTMLDivElement>();

  // Only a click on the dimmed backdrop itself closes it, not one inside the modal (B3).
  // The backdrop is not a control (role="presentation"): the keyboard closes the dialog with Escape instead.
  return (
    <div className="modal" role="presentation" onClick={e => { if (e.target === e.currentTarget) closeModal(); }} onKeyDown={onKeyDown}>
      <div className="modal__dialog" ref={ref} role="dialog" aria-modal="true" aria-label={activity === "signup" ? "Sign up" : "Login"} tabIndex={-1}>
          <div className="modal__tabs">
              <button type="button" className={activity === "login" ? "modal__tab modal__tab--active" : "modal__tab"} aria-pressed={activity === "login"} data-auth="login" onClick={authSelection}>Login</button>
              <button type="button" className={activity === "signup" ? "modal__tab modal__tab--active" : "modal__tab"} aria-pressed={activity === "signup"} data-auth="signup" onClick={authSelection}>Sign up</button>
          </div>
          <div className="modal__padding">
              <p className="modal__slug">Enter your email and password to <strong>sign in</strong></p>
          </div>
          {/* The fields and the submit button share one form (B22), so Enter submits like the button does. */}
          <form className="modal__form" onSubmit={authFailure}>
              {activity === "login" ? <div className="modal__login">
                  <div className="field">
                      <label htmlFor="modal-login-email" className="label label--caps">Email *</label>
                      <input id="modal-login-email" type="text" name="login_email" autoComplete="email" className="input input--plain" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <PasswordField id="modal-login-password" name="login_password" label="Password *" placeholder="Password" autoComplete="current-password" />
              </div> : ""}
              {activity === "signup" ? <div className="modal__signup">
                  <div className="field">
                      <label htmlFor="modal-signup-email" className="label label--caps">Email *</label>
                      <input id="modal-signup-email" type="text" name="signup_email" autoComplete="email" className="input input--plain" placeholder="Email" />
                      {/* <span className="auth-label">this is an auth message</span> */}
                  </div>
                  <PasswordField id="modal-signup-password" name="signup_password" label="Password *" placeholder="Password" autoComplete="new-password" />
                  <PasswordField id="modal-signup-confirmpassword" name="signup_confirmpassword" label="Confirm Password *" placeholder="Confirm Password" autoComplete="new-password" boxClassName="field--flush-top" />
              </div> : ""}
              <div className="modal__padding">
                  {activity === "login" ? <button className="button button--green modal__submit" type="submit">Login</button> : ""}
                  {activity === "signup" ? <button className="button button--green modal__submit" type="submit">Sign up</button> : ""}
                  {/* <span className="auth-label paddingBottom30">this is an auth message</span> */}
              </div>
          </form>
      </div>
    </div>
  )
}

export default Modal;
