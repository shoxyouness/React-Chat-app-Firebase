import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}></label>
      <input
        placeholder={props.placeholder}
        id={props.id}
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={props.type}
      />
    </div>
  );
});
export default Input;
