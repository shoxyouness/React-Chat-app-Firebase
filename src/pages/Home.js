import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import { useContext } from "react";
import { ChatContext } from "../store/Chat-context";
import classes from "./Home.module.css";
const Home = () => {
   const { chatState } = useContext(ChatContext);
  return (
    <div className={classes.home}>
      <SideBar />
      {console.log(chatState.chatId)}
      {chatState.chatId == null && <h1>Start a Conversation</h1>}
      {chatState.chatId != null && <Chat />}
    </div>
  );
};
export default Home;
