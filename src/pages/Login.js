import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import classes from"./Login.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
const Login = () => {
  const navigate=useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.LoginContainer}>
      <h1>Welcome to Chat4</h1>
      <p>This is my Chat Created with React</p>
      <form onSubmit={submitHandler}>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="password" />
        <Button type="submit">Login</Button>
      </form>
      <p>
        You don't have an Account ? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
export default Login;
