import { getDoc, onSnapshot,doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import classes from "./Chats.module.css";
import UserImg from "../assets/add.png";
import { db } from "../firebase";
import { AuthContext } from "../store/Auth-context";

import { ChatContext } from "../store/Chat-context";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser}=useContext(AuthContext);
  const {dispatchState}=useContext(ChatContext)
  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const selectHandler=( userInfo)=>{
  dispatchState({ type: "CHANGE_CHAT", user: userInfo });
  }
  return (
    <div>
      {Object.entries(chats).sort((a,b)=>b[1].date-a[1].date).map((chat) => (
        <div className={classes.userChat} key={chat[0]} onClick={()=>selectHandler(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} />
          <div className={classes.userInfo}>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Chats;
