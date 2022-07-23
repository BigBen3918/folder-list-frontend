import {
  ON_MODAL_TITLE_CHANGE,
  ON_MODAL_DESC_CHANGE,
} from "./../actions/types";

export const onModalTitleChange = (state = "", action) => {
  switch (action.type) {
    case ON_MODAL_TITLE_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

export const onModalDescChange = (state = "", action) => {
  switch (action.type) {
    case ON_MODAL_DESC_CHANGE:
      return action.payload;
    default:
      return state;
  }
};
