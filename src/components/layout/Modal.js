import React from 'react';
import svgAsset from "../../images/sprite.svg";

function Modal() {
  return (
    <div className="overlay">
      <div className="modal modalAuth">
          <div className="modalAuth__tabs">
              <button className="tab active">Login</button>
              <button className="tab">Sign up</button>
          </div>
          <div className="modalAuth__padding">
              <p className="modalAuth__slug">Enter your email and password to <strong>sign in</strong></p>
          </div>
          <div className="modalForm inputbox">
              <div className="modalForm__signup">
                  <div className="inputbox__box">
                      <label id="signup_email" className="inputbox__label">Email *</label>
                      <input type="text" name="signup_email" className="inputbox__input" placeholder="Email" />
                      <span className="auth-label">this is an auth message</span>
                  </div>
                  <div className="inputbox__box">
                      <label id="signup_password" className="inputbox__label">Password *</label>
                      <input type="text" name="signup_password" className="inputbox__input" placeholder="Password" />
                      <span className="auth-label">this is an auth message</span>
                      <svg className="modalForm__icon">
                          <use xlinkHref={`${svgAsset}#icon-eye`}></use>
                      </svg>
                  </div>
              </div>
              <div className="modalForm__login">
                  <div className="inputbox__box">
                      <label id="login_email" className="inputbox__label">Email *</label>
                      <input type="text" name="login_email" className="inputbox__input" placeholder="Email" />
                      <span className="auth-label">this is an auth message</span>
                  </div>
                  <div className="inputbox__box">
                      <label id="login_password" className="inputbox__label">Password *</label>
                      <input type="password" name="login_password" className="inputbox__input" placeholder="Password" />
                      <span className="auth-label">this is an auth message</span>
                      <svg className="modalForm__icon">
                          <use xlinkHref={`${svgAsset}#icon-eye`}></use>
                      </svg>
                  </div>
                  <div className="inputbox__box borderTop0">
                      <label id="login_confirmpassword" className="inputbox__label">Confirm Password *</label>
                      <input type="password" name="login_confirmpassword" className="inputbox__input" placeholder="Confirm Password" />
                      <span className="auth-label">this is an auth message</span>
                      <svg className="modalForm__icon">
                          <use xlinkHref={`${svgAsset}#icon-eye`}></use>
                      </svg>
                  </div>
              </div>
              <div className="modalAuth__padding">
                  <button className="button button--green" type="submit" disabled>Login</button>
                  <span className="auth-label paddingBottom30">this is an auth message</span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Modal;