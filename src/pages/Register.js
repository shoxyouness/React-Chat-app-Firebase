import React, { useState, useReducer } from "react";
import ImportPng from "../assets/import.png";
import classes from "./Register.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Input from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
const initialState = {
  username: "",
  email: "",
  password: "",
  avatar: "",
  userNameIsValid: true,
  emailIsValid: true,
  passwordIsValid: true,
};
const registerReducer = (state, action) => {
  if (action.type == "USERNAME") {
    let userNameIsValid = action.username.length > 0;
    return {
      ...state,
      username: action.username,
      userNameIsValid: userNameIsValid,
    };
  }
  if (action.type == "EMAIL") {
    let emailIsValid = action.email.length > 0;
    return {
      ...state,
      email: action.email,
      emailIsValid: emailIsValid,
    };
  }
  if (action.type == "PASSWORD") {
    let passwordIsValid = action.password.length > 0;
    return {
      ...state,
      password: action.password,
      passwordIsValid: passwordIsValid,
    };
  }
  if (action.type == "USERNAMEONBLUR") {
    let userNameIsValid = action.username.trim().length > 0;
    return {
      ...state,
      username: action.username,
      userNameIsValid: userNameIsValid,
    };
  }
  if (action.type == "EMAILONBLUR") {
    let emailIsValid =
      action.email.trim().length > 0 && action.email.includes("@");
    return {
      ...state,
      email: action.email,
      emailIsValid: emailIsValid,
    };
  }
  if (action.type == "PASSWORDONBLUR") {
    let passwordIsValid = action.password.trim().length > 0;
    return {
      ...state,
      password: action.password,
      passwordIsValid: passwordIsValid,
    };
  }
  return initialState;
};

const Register = () => {
  const [isValid, setIsValid] = useState(true);
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    let target = e.target.id;
    if (target == "username") {
      dispatch({ type: "USERNAME", username: e.target.value });
      return;
    }
    if (target == "email") {
      dispatch({ type: "EMAIL", email: e.target.value });
      return;
    }
    if (target == "password") {
      dispatch({ type: "PASSWORD", password: e.target.value });
      return;
    }
  };
  const intputOnBlurHandler = (e) => {
    let target = e.target.id;
    if (target == "username") {
      dispatch({ type: "USERNAMEONBLUR", username: e.target.value });
      return;
    }
    if (target == "email") {
      dispatch({ type: "EMAILONBLUR", email: e.target.value });
      return;
    }
    if (target == "password") {
      dispatch({ type: "PASSWORDONBLUR", password: e.target.value });
      return;
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !state.emailIsValid ||
      !state.passwordIsValid ||
      !state.userNameIsValid
    ) {
      return;
    }
    const username = state.username;
    const email = state.email;
    const password = state.password;
    const avatar = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email: email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {}
  };

  return (
    <div className={classes.registerContainer}>
      <h1>Welcome to Chat4</h1>
      <p>This is my Chat Created with React</p>
      <form onSubmit={submitHandler} className={classes.inputForm}>
        <div>
          <Input
            type="text"
            placeholder="Username"
            id="username"
            onChange={inputChangeHandler}
            onBlur={intputOnBlurHandler}
          />
          {!state.userNameIsValid && (
            <span className={classes.inValid}>Username is not valid</span>
          )}
        </div>
        <div>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            onChange={inputChangeHandler}
            onBlur={intputOnBlurHandler}
          />
          {!state.emailIsValid && (
            <span className={classes.inValid}>Email is not valid</span>
          )}
        </div>
        <div>
          <Input
            type="password"
            id="password"
            placeholder="password"
            onChange={inputChangeHandler}
            onBlur={intputOnBlurHandler}
          />
          {!state.passwordIsValid && <span className={classes.inValid}>password is not valid</span>}
        </div>
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file" className={classes.label}>
          <img src={ImportPng} />
          <span>add an Avatar</span>
        </label>
        <Button type="submit">Register</Button>
      </form>
      <p>
        You have already an Account ? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
};
export default Register;
