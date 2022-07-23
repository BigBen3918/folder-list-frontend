import { FETCH_USER } from "./../actions/types";

const fetchUser = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};

export default fetchUser;
