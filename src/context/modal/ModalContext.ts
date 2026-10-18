import { createContext, type MouseEvent } from "react";
export interface ModalContextValue {
  authSelection: (e: MouseEvent<HTMLElement>) => void;
  // Called from the form's submit: anything with preventDefault.
  authFailure: (e: { preventDefault: () => void }) => void;
  closeModal: () => void;
  activity: string | null;
  modalShow: boolean;
}
// No default value on purpose (as before): every consumer sits under its provider in main.
const modalContext = createContext<ModalContextValue>(undefined as unknown as ModalContextValue);
export default modalContext;