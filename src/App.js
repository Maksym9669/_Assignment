import React, { useState } from "react";
import { useInput } from "./hooks/useInput";
import { useLocalStorage } from "./hooks/useLocalStorage";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let firstNameRef = React.createRef();
  let lastNameRef = React.createRef();
  let phoneRef = React.createRef();
  let genderRef = React.createRef();
  let ageRef = React.createRef();
  const [formData, setFormData] = useState([]);
  const [warning, modifyWarning] = useState("");
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName
  } = useInput("");
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName
  } = useInput("");
  const { value: phone, bind: bindPhone, reset: resetPhone } = useInput("");
  const { value: gender, bind: bindGender, reset: resetGender } = useInput("");
  const { value: age, bind: bindAge, reset: resetAge } = useInput("");

  function addData() {
    setFormData(formData => [
      ...formData,
      { id: 1, firstName, lastName, age, gender, phone }
    ]);
  }

  function validateData() {
    let nameRegex = /^[a-z ,.'-]+$/i;
    let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    let genderRegex = "";

    modifyWarning("");
    firstNameRef.current.classList.remove("is-invalid");
    lastNameRef.current.classList.remove("is-invalid");
    phoneRef.current.classList.remove("is-invalid");
    ageRef.current.classList.remove("is-invalid");
    genderRef.current.classList.remove("is-invalid");
    if (!firstName.match(nameRegex)) {
      let warning =
        firstName == ""
          ? "This field shouldn't be empty"
          : "First name should consist only of english letters.";
      firstNameRef.current.classList.add("is-invalid");
      modifyWarning(warning);
      // console.log(textInput.current);
      // textInput.current.classList.add("is-invalid");
    } else if (!lastName.match(nameRegex)) {
      let warning =
        lastName == ""
          ? "This field shouldn't be empty"
          : "Last name should consist only of english letters.";
      lastNameRef.current.classList.add("is-invalid");
      modifyWarning(warning);
    } else if (age < 1 || age > 100) {
      let warning =
        lastName == ""
          ? "This field shouldn't be empty"
          : "Age should be a number between 1 and 100";
      ageRef.current.classList.add("is-invalid");
      modifyWarning(warning);
    } else if (!gender) {
      console.log(gender);
    } else if (!phone.match(phoneRegex)) {
      let warning =
        lastName == ""
          ? "This field shouldn't be empty"
          : "Phone number should consist only of numbers";
      phoneRef.current.classList.add("is-invalid");
      modifyWarning(warning);
    } else {
      addData();
      resetFirstName();
      resetLastName();
      resetPhone();
      resetGender();
      resetAge();
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    validateData();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>hi</h1>
        {/* <button onClick={addData}>Submit</button> */}
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {formData.map(formEntry => (
              <tr key={formEntry.id}>
                <td>{formEntry.firstName}</td>
                <td> {formEntry.lastName}</td>
                <td> {formEntry.age}</td>
                <td>{formEntry.gender}</td>
                <td> {formEntry.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="text"
                {...bindFirstName}
                ref={firstNameRef}
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                ref={lastNameRef}
                {...bindLastName}
                className="form-control"
                placeholder="Last name"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="number"
                ref={ageRef}
                {...bindAge}
                className="form-control"
                placeholder="Age"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                {...bindPhone}
                ref={phoneRef}
                className="form-control"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              Gender:
              <input
                type="radio"
                {...bindGender}
                ref={genderRef}
                className="form-control"
                value="Male"
                id="Male"
                name="gender"
              />
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                {...bindGender}
                ref={genderRef}
                className="form-control"
                value="Female"
                id="Female"
                name="gender"
              />
              <label htmlFor="Female">Female</label>
            </div>
          </div>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>

        {warning ? (
          <div
            class="alert alert-danger"
            role="alert"
            style={{ margin: "10px" }}
          >
            {warning}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
