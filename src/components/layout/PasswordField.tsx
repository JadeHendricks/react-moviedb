import React, { useState } from 'react';
import svgAsset from "../../images/sprite.svg";

interface PasswordFieldProps {
  /** The id the label already had; Phase 6 turns these into proper htmlFor links. */
  labelId: string;
  name: string;
  label: string;
  placeholder: string;
  /** Extra class on the box, e.g. "borderTop0". */
  boxClassName?: string;
}

/** A password input with its show/hide icon. The visibility is React state (B19), not DOM edits. */
function PasswordField({ labelId, name, label, placeholder, boxClassName }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={boxClassName ? `inputbox__box ${boxClassName}` : "inputbox__box"}>
        <label id={labelId} className="inputbox__label">{label}</label>
        <input type={visible ? "text" : "password"} name={name} className="inputbox__input" placeholder={placeholder} />
        {/* <span className="auth-label">this is an auth message</span> */}
        {/* The sprite url is an import, so it follows the build's hashed file name (B19). */}
        <svg className="modalForm__icon" onClick={() => setVisible(shown => !shown)}>
            <use href={`${svgAsset}#${visible ? "icon-eye-blocked" : "icon-eye"}`}></use>
        </svg>
    </div>
  )
}
export default PasswordField;