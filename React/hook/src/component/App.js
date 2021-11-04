import React, { useState } from "react";

function useFormInputs(initialvalue) {
  const [value, seTvalue] = useState("");
  function handleChange(e) {
    seTvalue(e.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}
function App(props) {
  const email = useFormInputs("");
  const password = useFormInputs("");

  return (
    <form>
      <div>Email</div>
      <div>
        <input type="text" {...email} />
      </div>
      <div>password</div>
      <div>
        <input type="text" {...password} />
      </div>
      <p>
        <strong>Email : </strong>
        <p>{email.value}</p>
      </p>
      <p>
        <strong>password : </strong>
        <p>{password.value}</p>
      </p>
    </form>
  );
}

export default App;
