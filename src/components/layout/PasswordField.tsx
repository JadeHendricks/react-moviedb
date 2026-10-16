import React, { useState } from 'react';
import '../../styles/atoms/icon.scss';
import '../../styles/atoms/input.scss';
import '../../styles/atoms/label.scss';
import '../../styles/molecules/field.scss';
import svgAsset from "../../images/sprite.svg";

interface PasswordFieldProps {
  /** The id the label already had; Phase 6 turns these into proper htmlFor links. */
  labelId: string;
  name: string;
  label: string;
  placeholder: string;
  /** Extra class on the box, e.g. "field--flush-top". */
  boxClassName?: string;
}

/** A password input with its show/hide icon. The visibility is React state (B19), not DOM edits. */
function PasswordField({ labelId, name, label, placeholder, boxClassName }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={boxClassName ? `field ${boxClassName}` : "field"}>
        <label id={labelId} className="label label--caps">{label}</label>
        <input type={visible ? "text" : "password"} name={name} className="input input--plain" placeholder={placeholder} />
        {/* <span className="auth-label">this is an auth message</span> */}
        {/* The sprite url is an import, so it follows the build's hashed file name (B19). */}
        <svg className="icon icon--clickable field__icon" onClick={() => setVisible(shown => !shown)}>
            <use href={`${svgAsset}#${visible ? "icon-eye-blocked" : "icon-eye"}`}></use>
        </svg>
    </div>
  )
}
export default PasswordField;