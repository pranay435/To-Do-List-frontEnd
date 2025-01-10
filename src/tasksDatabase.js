import axios from "axios";
import React, { useState, useEffect } from "react";
import AddButton from "./AddButton";

export default function DataBase({rerender}) {
    let setrender  = false
    const axiosInstance = axios.create({
        withCredentials: true,
      });

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axiosInstance.get('http://localhost:5000/gettasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
            })
    }
    useEffect(() => {
        fetchTasks();
    }, [rerender])

    const removeTask = (id) =>{

        axiosInstance.delete(`http://localhost:5000/delete/${id}`)
        .then((response)=>{
            if(response.status===200){
                fetchTasks();
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    let pendingtasks = tasks.filter((item) => {
        return item.time < getCurrentDate(new Date)
    })

    let taskstodo = tasks.filter((item) => {
        return item.time >= getCurrentDate(new Date)
    })

    pendingtasks = pendingtasks.map((item) => (
        <p className="pending-task"  key={item.id}>{item.task} <button className='taskActionButton' onClick={()=>removeTask(item.id)}>Completed</button></p>
    ));

    taskstodo = taskstodo.map((item) => (
        <p className="todo-task" key={item.id}>{item.task} <button className="taskActionButton" onClick={()=>removeTask(item.id)}>Completed</button></p>
    ))
    
    if(pendingtasks.length > 0)setrender=true
    


    return (
        <main className="main-home">
            <div className='todotasks-container'>
                <h4 className="stickattop-todo">Tasks Todo</h4>
                <div className='taskstodo'>
                    <div className="book">
                    {taskstodo}
                    </div>
                </div>
            </div>
            {setrender && <div className='pendingtasks-container'>
                <h4 className="stickattop-pending">Tasks Pending</h4>
                <div className="pendingtasks">
                    {pendingtasks}
                </div>
            </div>}
        </main>
    );
}
