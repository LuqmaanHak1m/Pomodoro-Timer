import { useState } from "react";
import { Button, Form, FormGroup } from "reactstrap";

function BreakInput({ onSubmit }) {
  const [newTime, setNewTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    let sendTime = parseInt(newTime, 10); // Convert the input to an integer

    if (!sendTime || isNaN(sendTime)) {
      // Check if the input is zero or NaN
      sendTime = 5; // Default value if input is invalid
    }

    onSubmit(sendTime); // Call the parent function with the new time

    setNewTime(""); // Clear the input field after submission
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="time" className="me-2">
            New Break Time:
          </label>
          <input
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            type="number"
            id="time"
            min={0}
          />
        </FormGroup>

        <Button type="submit">Add</Button>
      </Form>
    </>
  );
}

export default BreakInput;
