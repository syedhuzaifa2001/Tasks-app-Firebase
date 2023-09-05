import { Fragment, useRef, useState } from "react";

import classes from "./TaskForm.module.css";
import ErrorModal from "../Error/ErrorModal";

const TaskForm = (props) => {
  const [error, setError] = useState(false);
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length<=2) {
      setError(true);
    }
    props.onEnterTask(enteredValue);
    taskInputRef.current.value=""
  };
  const closeHandler = () => {
    setError(false);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal onClose={closeHandler}><h1>Enter Valid Tasks!</h1>
        <p>Tasks should be greater than 2 in length!</p>
        </ErrorModal>
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <input placeholder="Input the Task" type="text" ref={taskInputRef} />
        <button>{props.loading ? "Sending..." : "Add Task"}</button>
      </form>
    </Fragment>
  );
};

export default TaskForm;
