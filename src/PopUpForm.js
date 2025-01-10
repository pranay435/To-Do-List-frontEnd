import React, { useState } from "react";
import DateForm from "./DateForm";
import DataBase from "./tasksDatabase";
import axios from "axios";

export default function PopUpForm({ onClose, render }) {
    const axiosInstance = axios.create({
        withCredentials: true, 
    });

    const [isFormEmpty, setFormStatus] = useState(false)

    const [formData, setFormData] = useState({
        id: -1,
        task: '',
        time: ''
    });

    const handleData = async (e) => {
        e.preventDefault();
        if (!formData.task.trim()) {
            setFormStatus(true)
            return;
        }

        axiosInstance.post('http://localhost:5000/addtask', formData)
        .then((response) => {
          if (response.status === 200) {
            render();
            onClose();
          } else {
            console.log("Error in adding the task");
          }
        })
        .catch((error) => {
          console.error("Error in sending the post request", error);
        });
    }
    return (
        <div className="popup-form">
            <span onClick={onClose} className='closemark'>&times;</span>
            <h3 className="form-heading">Add new Task</h3>
            <form onSubmit={handleData} className='form'>
                <input
                    type="text"
                    name="task"
                    value={formData.task}
                    className="task-input"
                    onChange={(e) => {
                        setFormStatus(false)
                        setFormData({ ...formData, task: e.target.value })
                    }}
                />
                {isFormEmpty && !formData.task.trim() && <div
                    className="error-message">Enter a valid task</div>
                }
                <input
                    type="date"
                    id="dateInput"
                    name="dateInput"
                    value={formData.time}
                    onChange={(e) => {
                        setFormData({ ...formData, time: e.target.value })
                    }}
                    required
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    )
}