import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  // set up our Refs for each DOM element we want to update
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const buttonRef = useRef();

  // state
  const [personArray, setPersonArray] = useState([]);
  const [button, setButton] = useState(false);

  const onButtonClick = () => {
    updatePersonArray();
    setButton(true);
  };

  const updatePersonArray = () => {
    setPersonArray(peaches => [...peaches, getResults()]);
  };

  const mapObjectToJSX = () => {
    return personArray.map(person => (
      <ul key={Math.random()}>
        <li>{person.name}</li>
        <li>{person.phone}</li>
        <li>{person.email}</li>
      </ul>
    ));
  };

  const getResults = () => {
    return {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value
    };
  };

  const shouldDisableButton = (pattern, ref) => {
    const reg = new RegExp(pattern);
    if (ref.current.value.search(reg) !== -1) {
      buttonRef.current.disabled = true;
    } else {
      buttonRef.current.disabled = false;
    }
  };

  const onPhoneChange = () => {
    var pattern = /[a-zA-Z]/g;

    shouldDisableButton(pattern, phoneRef);

    if (phoneRef.current.value.length === 10) {
      buttonRef.current.focus();
    }
  };

  const onNameChange = () => {
    var pattern = /[0-9]/g;
    shouldDisableButton(pattern, nameRef);
  };

  useEffect(() => {
    console.log("NameRef", nameRef.current);
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Enter Your Info</h1>
        <input
          type="text"
          onChange={() => onNameChange()}
          ref={nameRef}
          placeholder="name"
        />
        <br></br>
        <br></br>
        <input type="text" ref={emailRef} placeholder="email" />
        <br></br>
        <br></br>
        <input
          type="text"
          onChange={() => onPhoneChange()}
          ref={phoneRef}
          placeholder="phone"
        />
        <br></br>
        <br></br>
        <button ref={buttonRef} onClick={e => onButtonClick()}>
          Submit
        </button>
      </div>
      {button ? mapObjectToJSX() : null}
    </div>
  );
}

export default App;
