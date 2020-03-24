import { 
  SET_ACTIVITY,
  MODAL_VISIBILITY } from '../types';

export default ( state, action ) => {
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