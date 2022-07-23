import { ERROR } from "../actions/types";

const errorCreator = (state = null, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default errorCreator;
