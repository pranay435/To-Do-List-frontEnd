import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from "react";
import axios from "axios";

export default function DateForm({ onDateClose, Setdate }) {
    const [date, setDate] = useState(null)

    const formatDate = (str) => {
        const day = String(str.getDate()).padStart(2, '0')
        const month = String(str.getMonth() + 1).padStart(2, '0')
        const year = String(str.getFullYear()).slice(-2)
        return `${day}-${month}-${year}`;
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const formattedDate = formatDate(date);
        Setdate(formattedDate);
    }



    return (
        <div className="dateform" >
            <form onSubmit={handleSubmit}>
                <ReactDatePicker
                    selected={date}
                    onSelect={(selecteddate)=>{
                        setDate(selecteddate);
                    }}
                    dateFormat="dd-MM-yy"
                    placeholderText="Select Date"
                    className="dateselection"
                />
            </form>
            <button type="submit">Ok</button>
        </div>
    )
}