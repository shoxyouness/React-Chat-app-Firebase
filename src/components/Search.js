import { useContext, useState } from "react";
import UserImg from "../assets/add.png";
import classes from "./Search.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../store/Auth-context";

const Search = () => {
  const [searchedUserName, setSearchedUserName] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const searchHandler = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", searchedUserName));
    const querySnapshot = await getDocs(q);
    console.log(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
      setSearchedUser(doc.data());
    });
  };
  const foundHandler = async (e) => {
    const combienedID =
      currentUser.uid > searchedUser.uid
        ? currentUser.uid + searchedUser.uid
        : searchedUser.uid + currentUser.uid;
    const res = await getDoc(doc(db, "chats", combienedID));
    if (!res.exists()) {
      await setDoc(doc(db, "chats", combienedID), { messages: [] });
      await updateDoc(
        doc(db, "userChats", currentUser.uid), {
          [combienedID + ".userInfo"]: {
            uid: searchedUser.uid,
            displayName: searchedUser.displayName,
            photoURL: searchedUser.photoURL,
          },
          [combienedID + ".date"]: serverTimestamp(),
        }
      );
      await updateDoc(
        doc(db, "userChats", searchedUser.uid), {
          [combienedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combienedID + ".date"]: serverTimestamp(),
        })
      ;
    }
    setSearchedUser(null);
    setSearchedUserName('');
  };
  return (
    <div className={classes.search}>
      <div className={classes.searchForm}>
        <input
          type="text"
          placeholder="find a user " value={searchedUserName}
          onKeyUp={searchHandler}
          onChange={(e) => {
            setSearchedUserName(e.target.value);
          }}
        />
      </div>
      {searchedUser && (
        <div className={classes.userChat} onClick={foundHandler}>
          <img src={searchedUser.photoURL} />
          <div className={classes.userInfo}>
            <span>{searchedUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
