import { useContext, useEffect, useRef, useState } from "react";
import Img from "../assets/add.png";
import "./Message.css";
import { AuthContext } from "../store/Auth-context";
import { ChatContext } from "../store/Chat-context";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId == currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId == currentUser.uid
              ? currentUser.photoURL
              : chatState.user.photoURL
          }
        />
        <span>
         Just now
        </span>
      </div>
      <div className="messageContent">
        {message.text.trim().length > 0 && <p>{message.text}</p>}
        {message.img && <img src={message.img} />}
      </div>
    </div>
  );
};
export default Message;
