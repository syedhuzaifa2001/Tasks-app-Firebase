import TaskItems from "./TaskItems";
import classes from "./Tasks.module.css";
import React from "react";
import Section from "../UI/Section";

const Tasks = (props) => {
  let tasklist = <h2>No tasks found. Start adding some!</h2>;
  if (props.items.length > 0) {
    tasklist = (
      <ul>
        {props.items.map((data) => (
          <TaskItems key={data.id}>{data.text}</TaskItems>
        ))}
      </ul>
    );
  }

  let content = tasklist;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = "Loading tasks...";
  }
  return (
    <Section>
        <div className={classes.container}>{content}</div>
    </Section>
  )
};

export default Tasks;
