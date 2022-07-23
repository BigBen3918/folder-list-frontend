import { combineReducers } from "redux";
import fetchUser from "./fetchUser";
import activeDropdown from "./activeDropdown";
import { onModalDescChange, onModalTitleChange } from "./onModalFieldChange";
import fetchFolders from "./fetchFolders";
import folderModalState from "./FolderModalState";
import errorCreator from "./errorCreator";
import isFolderCUDLoading from "./isFolderCUDLoading";
import reduceFolder from "./reduceFolder";
import todoListRequestLoading from "./todoListRequestLoading";

export default combineReducers({
  user: fetchUser,
  activeDropdown,
  modalTitle: onModalTitleChange,
  modalDesc: onModalDescChange,
  folders: fetchFolders,
  folderModalState,
  unexpectedError: errorCreator,
  isFolderCUDLoading: isFolderCUDLoading,
  todoListRequestLoading,
  activeTodoList: reduceFolder,
  notFound404: (state = false, action) => {
    switch (action.type) {
      case "NOT_FOUND_404":
        return action.payload;
      default:
        return state;
    }
  },
});
