import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import './history.css'
import Cookie from "js-cookie";
import Login from "./Login";

export default function History() {

    const axiosInstance = axios.create({
        withCredentials: true, // Enable sending cookies with the request
    });
    const [history, setHistory] = useState([])

    const isCookieSet = !!Cookie.get('user')
    let loggeduser = null
    let isloggedin = null
    if(isCookieSet){
        isloggedin = true
        loggeduser = Cookie.get('user')
    }
    else{
        isloggedin = false
    }
    const [loggedin,setlogstatus] = useState(isloggedin)
    const [user,setUser] = useState(loggeduser)

    const clearhistory = async () => {
        axiosInstance.get('http://localhost:5000/clearhistory')
            .then((response) => {
                console.log("Cleared History")
                setHistory([])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const response = async () => {
        axiosInstance.get('http://localhost:5000/history')
            .then((response) => {
                setHistory(response.data)
            })
            .catch((error) => {
                console.error("Error: ", error)
            })
    }
    useEffect(() => {
        response();
    }, []);

    const setLogin = (username) => {
        if (username) {
            setUser(username)
            setlogstatus(true)
            Cookie.set('user', username, { expires: 1 })
        }

    }

    let historyData = history.map((item) => {
        return <p key={item.id} className="historytasks">{item.task}<span className="time">{item.time}</span></p>
    })
    return (
        <div className="pageContainer-history">
            {!loggedin ? (<Login setlogin={setLogin} />)
            :
            (<><div className="header-history">
                <ul className="navbar-history">
                <li className="heading-container"><h3 className="heading-history">Todo History</h3></li>
                <li className="clear-container"><button className="historyclearbutton" onClick={clearhistory}>Clear</button></li>
                    
                </ul>
            </div>
            <div className="main-history">
                {historyData}
            </div>
            <footer className="footer-history">

            </footer>
            </>)}
        </div>
    )
}