import { createContext, type MouseEvent } from "react";

export interface ModalContextValue {
  authSelection: (e: MouseEvent<HTMLElement>) => void;
  showPassword: (e: MouseEvent<SVGSVGElement>) => void;
  closeModal: () => void;
  authFailure: (e: MouseEvent<HTMLElement>) => void;
  activity: string | null;
  modalShow: boolean;
}

// No default value on purpose (as before): every consumer sits under its provider in App.
const modalContext = createContext<ModalContextValue>(undefined as unknown as ModalContextValue);
export default modalContext;
