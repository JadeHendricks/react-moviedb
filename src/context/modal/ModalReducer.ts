import { 
  SET_ACTIVITY,
  MODAL_VISIBILITY } from '../types';

export interface ModalStateShape {
  activity: string | null;
  modalShow: boolean;
}

export type ModalAction =
  | { type: typeof SET_ACTIVITY; payload: string }
  | { type: typeof MODAL_VISIBILITY; payload: boolean };

export default ( state: ModalStateShape, action: ModalAction ): ModalStateShape => {
  switch (action.type) {
    case SET_ACTIVITY:
      return {
        ...state,
        activity: action.payload
      };
      case MODAL_VISIBILITY:
      return {
        ...state,
        modalShow: action.payload
      };
    default: 
      return state;
  }
};
