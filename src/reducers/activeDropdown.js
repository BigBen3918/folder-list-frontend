import { ACTIVE_ACTION_DROPDOWN } from "../actions/types";

const activeDropdown = (state = "", action) => {
  switch (action.type) {
    case ACTIVE_ACTION_DROPDOWN:
      return action.payload;
    default:
      return state;
  }
};

export default activeDropdown;
