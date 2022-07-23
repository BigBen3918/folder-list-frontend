import { TODOLIST_REQUEST_LOADING } from "../actions/types";

const todoListRequestLoading = (state = false, action) => {
  switch (action.type) {
    case TODOLIST_REQUEST_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default todoListRequestLoading;
