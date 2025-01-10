import React, { useState } from "react";

export default function FormComponent() {
  const [formData, setFormData] = useState({
    textInput: "",
    dateInput: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data sent successfully.");
        // Reset form fields or navigate to a success page if needed.
      } else {
        console.error("Error in sending data.");
      }
    } catch (error) {
      console.error("Error in sending the post request", error);
    }
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="textInput">Text Input:</label>
          <input
            type="text"
            id="textInput"
            name="textInput"
            value={formData.textInput}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateInput">Date Input:</label>
          <input
            type="date"
            id="dateInput"
            name="dateInput"
            value={formData.dateInput}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

