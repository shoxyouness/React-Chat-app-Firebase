import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import classes from "./Messages.module.css";
import { ChatContext } from "../store/Chat-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatState } = useContext(ChatContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatState.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [chatState.chatId]);
  console.log(messages);
  return (
    <div className={classes.messages}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};
export default Messages;
