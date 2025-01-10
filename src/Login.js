import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';


export default function Login({setlogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [rerender, setrerender] = useState(false)
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [notSignedUp, setNotSignedUp] = useState(false);
    const [signedUp,setSignedUp] = useState(false)
    
    const axiosInstance = axios.create({
        withCredentials: true, // Enable sending cookies with the request
      });
    
    const handleSignIn = () => {
        axiosInstance.post('http://localhost:5000/login',{
            username:username,
            password:password
        })
      .then(function(response) {
        if(response.status === 200){
        const {username} = response.data
        const user=username
        setlogin(user);
        console.log(response.data);
        
        }
      })
      .catch(function(error) {
        console.error(error);
        if(error.response && error.response.status===401){
            setNotLoggedIn(true);
            setNotSignedUp(false)
            setSignedUp(false)
            setUsername('');
            setPassword(''); 
        }
      });
    }

    const handleSignUP = () => {
        axiosInstance.post('http://localhost:5000/signup',{
            username:username,
            password:password
        })
        .then((response)=>{
            if(response.status === 200){
                console.log("User successfully signed up")
                setSignedUp(true)
                setNotLoggedIn(false)
                setNotSignedUp(false)
                setUsername('');
                setPassword(''); 
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response && err.response.status===401){
                setNotSignedUp(true)
                setNotLoggedIn(false)
                setSignedUp(false)
                setUsername('');
                setPassword(''); 
            }
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name === 'username') {
            setUsername(value)
        }
        else if (name === 'password') {
            setPassword(value)
        }
    }

    


    return (
        <div className='loginPage'>
            <header className='header'>
                <nav className='navabar'>
                    <ul className='list'>
                        {/* <li>Home</li>
                        <li>About</li>
                        <li>Contact</li> */}
                        <li className='login-heading'>ToDo</li>
                        <li className='login/user'>Please Login</li>
                    </ul>
                </nav>
            </header>
            <main className='main-login'>
                {signedUp && <h3>Successfully Signed Up</h3>}
                {notSignedUp && <h3 className='login-error'>UserName Already Exists</h3>}
                {notLoggedIn && <h3 className='login-error'>Invalid Credentials</h3>}
                <div className='loginBox'>
                    <h3 className='signInText'>SIGN IN</h3>
                    <input
                        type='text'
                        name='username'
                        className='username'
                        placeholder='Username'
                        value={username}
                        onChange={handleInputChange}
                    />
                    <input
                        type='password'
                        className='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={handleInputChange}></input>
                    <div className='buttons'>
                        <button className='signin' onClick={handleSignIn}>Sign In</button>
                        <button className='signup' onClick={handleSignUP}>Sign Up</button>
                    </div>
                </div>
            </main>
            <footer className='footer'>
                <div>

                </div>
            </footer>
        </div>
    )
}
