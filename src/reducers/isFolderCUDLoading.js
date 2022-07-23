import { FOLDER_REQUEST_LOADING } from "../actions/types";

const isFolderCreateLoading = (state = false, action) => {
  switch (action.type) {
    case FOLDER_REQUEST_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default isFolderCreateLoading;
