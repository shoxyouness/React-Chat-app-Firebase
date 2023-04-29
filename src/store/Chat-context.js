import React, { useContext, useReducer } from "react";
import { AuthContext } from "./Auth-context";

 export const ChatContext = React.createContext();

const INITIAL_STATE = {
  chatId:null,
  user: {},
};

const ChatProvider = ({children}) => {
  const { currentUser } = useContext(AuthContext);
  const chatReducer = (state, action) => {
    if (action.type == "CHANGE_CHAT") {
      return {
        chatId:
          currentUser.uid > action.user.uid
            ? currentUser.uid + action.user.uid
            : action.user.uid + currentUser.uid,
        user: action.user,
      };
    }
    return state;
  };
  const [chatState, dispatchState] = useReducer(chatReducer, INITIAL_STATE);
  
  return (
    <ChatContext.Provider value={{ chatState, dispatchState }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
