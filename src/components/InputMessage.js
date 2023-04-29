import classes from "./InputMessage.module.css";
import Mic from "../assets/mic.png";
import Doc from "../assets/file.png";
import Img from "../assets/img.png";
import { useContext, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ChatContext } from "../store/Chat-context";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { AuthContext } from "../store/Auth-context";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Button from '../UI/Button'
const InputMessage = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { chatState } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const sendHandler = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            updateDoc(doc(db, "chats", chatState.chatId), {
              messages: arrayUnion({
                id: uuid(),
                img: downloadURL,
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatState.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatState.chatId + ".lastMessage"]: {
        text,
      },
      [chatState.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", chatState.user.uid), {
      [chatState.chatId + ".lastMessage"]: {
        text,
      },
      [chatState.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  return (
    <div className={classes.inputContainer}>
      <input
        type="text"
        placeholder="Write a Message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className={classes.InputControllers}>
        <img src={Doc} />
        <input
          type="file"
          id="fileImg"
          style={{ display: "none" }}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <label htmlFor="fileImg">
          <img src={Img} />
        </label>
        <img src={Mic} />
        <Button onClick={sendHandler}>Send</Button>
      </div>
    </div>
  );
};
export default InputMessage;
