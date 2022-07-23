import { FETCH_FOLDERS } from "../actions/types";

const fetchFolders = (state = null, action) => {
  switch (action.type) {
    case FETCH_FOLDERS:
      return [...action.payload];
    default:
      return state;
  }
};
export default fetchFolders;
