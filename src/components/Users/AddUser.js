import React, { useRef, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const EntredName = nameInputRef.current.value;
    const entredUserAge = ageInputRef.current.value;
    const entredUsercollege = collegeInputRef.current.value;

    if (EntredName.trim().length === 0 || entredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+entredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(EntredName, entredUserAge,entredUsercollege);

    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <label htmlFor="college">College Name</label>
          <input id="college" ref={collegeInputRef}/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
