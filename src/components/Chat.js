import CamPng from "../assets/camera.png";
import AccPng from "../assets/account.png";
import InfoPng from "../assets/info.png";
import Messages from "./Messages";
import { useContext } from "react";
import { ChatContext } from "../store/Chat-context";
import classes from "./Chat.module.css";
import InputMessage from "./InputMessage";
const Chat = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div className={classes.chatContainer}>
      <div className={classes.bar}>
        <div className={classes.chatInfo}>
          <img src={chatState.user?.photoURL} />
          <span>{chatState.user?.displayName}</span>
        </div>
        <div className={classes.features}>
          <img src={AccPng} />
          <img src={CamPng} />
          <img src={InfoPng} />
        </div>
      </div>

      <Messages />
      <InputMessage />
    </div>
  );
};
export default Chat;
