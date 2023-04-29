import classes from "./NavBar.module.css";
import UserImg from '../assets/add.png'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../store/Auth-context";
import Button from "../UI/Button";

const NavBar = () => {
  const {currentUser}=useContext(AuthContext)
  return (
    <div className={classes.navbar}>
      <div className={classes.user}>
        <img src={currentUser.photoURL} />
        <span>{currentUser.displayName}</span>
        <Button onClick={() => signOut(auth)}>Logout</Button>
      </div>
    </div>
  );
};
export default NavBar;
