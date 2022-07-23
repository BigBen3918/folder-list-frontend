import { FETCH_FOLDER } from "../actions/types";

const reduceFolder = (state = null, action) => {
  switch (action.type) {
    case FETCH_FOLDER:
      return action.payload;
    default:
      return state;
  }
};

export default reduceFolder;
