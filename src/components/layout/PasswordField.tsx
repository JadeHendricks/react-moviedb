import React, { useState } from 'react';
import '../../styles/atoms/icon.scss';
import '../../styles/atoms/icon-button.scss';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/label.scss';
import '../../styles/molecules/field.scss';
import svgAsset from "../../images/sprite.svg";

interface PasswordFieldProps {
  /** The input's id; the label points at it with htmlFor (B22). */
  id: string;
  name: string;
  label: string;
  placeholder: string;
  /** Tells the browser and password managers which kind of password this is. */
  autoComplete: "current-password" | "new-password";
  /** Extra class on the box, e.g. "field--flush-top". */
  boxClassName?: string;
}

/** A password input with its show/hide button. The visibility is React state (B19), not DOM edits. */
function PasswordField({ id, name, label, placeholder, autoComplete, boxClassName }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={boxClassName ? `field ${boxClassName}` : "field"}>
        <label htmlFor={id} className="label label--caps">{label}</label>
        <input id={id} type={visible ? "text" : "password"} name={name} autoComplete={autoComplete} className="input input--plain" placeholder={placeholder} />
        {/* <span className="auth-label">this is an auth message</span> */}
        {/* A real button with a name and pressed state, so the keyboard and screen readers can use it. */}
        {/* The sprite url is an import, so it follows the build's hashed file name (B19). */}
        <button type="button" className="icon-button field__icon" aria-label={`Show ${label.replace(/ \*$/, "").toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible(shown => !shown)}>
            <svg className="icon icon--block" aria-hidden="true" focusable="false">
                <use href={`${svgAsset}#${visible ? "icon-eye-blocked" : "icon-eye"}`}></use>
            </svg>
        </button>
    </div>
  )
}

export default PasswordField;
