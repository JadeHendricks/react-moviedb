import React from 'react';

function AccountSettings() {
  return (
    <div className="accountSettings">
        <div className="accountSettings__banner">
            <h1 className="accountSettings__title">Edit Profile</h1>
        </div>
        <form className="accountform">
            <div className="accountform__container">
                <div className="accountform__box">
                    <label id="Username" className="accountform__label">Username</label>
                    <input type="text" name="Username" className="accountform__input" placeholder="Username" />
                </div>
                <div className="accountform__box">
                    <label id="firstname" className="accountform__label">First Name</label>
                    <input type="text" name="firstname" className="accountform__input" placeholder="First name" />
                </div>
                <div className="accountform__box">
                    <label id="lastName" className="accountform__label">Last Name</label>
                    <input type="text" name="lastName" className="accountform__input" placeholder="Last name" />
                    <span className="auth-label">this is an auth message</span>
                </div>
                <div className="accountform__box">
                    <label id="accountemailAddress" className="accountform__label">Email Address *</label>
                    <input type="text" name="accountemailAddress" className="accountform__input" placeholder="Email address" />
                    <span className="auth-label">this is an auth message</span>
                </div>
                <div className="accountform__box">
                    <label id="currentPassword" className="accountform__label">Current password</label>
                    <input type="text" name="currentPassword" className="accountform__input" placeholder="Current password" />
                    <span className="auth-label">this is an auth message</span>
                </div>
                <div className="accountform__box">
                    <label id="newpassword" className="accountform__label">New password</label>
                    <input type="text" name="newpassword" className="accountform__input" placeholder="New password" />
                </div>
                <div className="accountform__box">
                    <label id="biography" className="accountform__label">Biography</label>
                    <textarea name="biography" className="accountform__textarea" placeholder="Biography"></textarea>
                </div>
                <button className="button button--green" type="submit">Update Profile</button>
            </div>
        </form>
    </div>
  )
}

export default AccountSettings;
