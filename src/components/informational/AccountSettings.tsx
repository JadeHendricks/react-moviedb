import React from 'react';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/label.scss';
import '../../styles/pages/account.scss';
import '../../styles/atoms/button.scss';

function AccountSettings() {
  return (
    <div className="account">
        <div className="account__banner">
            <h1 className="account__title">Edit Profile</h1>
        </div>
        <form className="account__form">
            <div className="account__container">
                <div className="account__field">
                    <label htmlFor="account-username" className="label label--block">Username</label>
                    <input type="text" id="account-username" name="Username" className="input input--outlined" placeholder="Username" />
                </div>
                <div className="account__field">
                    <label htmlFor="account-firstname" className="label label--block">First Name</label>
                    <input type="text" id="account-firstname" name="firstname" className="input input--outlined" placeholder="First name" />
                </div>
                <div className="account__field">
                    <label htmlFor="account-lastname" className="label label--block">Last Name</label>
                    <input type="text" id="account-lastname" name="lastName" className="input input--outlined" placeholder="Last name" />
                    <span className="label label--error">this is an auth message</span>
                </div>
                <div className="account__field">
                    <label htmlFor="account-email" className="label label--block">Email Address *</label>
                    <input type="text" autoComplete="email" id="account-email" name="accountemailAddress" className="input input--outlined" placeholder="Email address" />
                    <span className="label label--error">this is an auth message</span>
                </div>
                <div className="account__field">
                    <label htmlFor="account-current-password" className="label label--block">Current password</label>
                    <input type="password" autoComplete="current-password" id="account-current-password" name="currentPassword" className="input input--outlined" placeholder="Current password" />
                    <span className="label label--error">this is an auth message</span>
                </div>
                <div className="account__field">
                    <label htmlFor="account-new-password" className="label label--block">New password</label>
                    <input type="password" autoComplete="new-password" id="account-new-password" name="newpassword" className="input input--outlined" placeholder="New password" />
                </div>
                <div className="account__field">
                    <label htmlFor="account-biography" className="label label--block">Biography</label>
                    <textarea id="account-biography" name="biography" className="input input--outlined input--area" placeholder="Biography"></textarea>
                </div>
                <button className="button button--green account__submit" type="submit">Update Profile</button>
            </div>
        </form>
    </div>
  )
}

export default AccountSettings;
