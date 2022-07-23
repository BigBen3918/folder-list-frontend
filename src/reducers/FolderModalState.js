import { FOLDER_MODAL_STATE } from "./../actions/types";

const folderModalState = (state = "", action) => {
  switch (action.type) {
    case FOLDER_MODAL_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default folderModalState;
