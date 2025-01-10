import { useEffect, useState, useContext, useHistory} from 'react'
import AddButton from './AddButton'
import './Home.css'
import './history.css'
import DataBase from './tasksDatabase'
import Login from './Login'
import Cookie from 'js-cookie'


export default function Home(){
    const [rerender,setRerender] = useState(false)

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
     useEffect(()=>{
      
     },[user,rerender])
    const setLogin = (username)=>{
        if(username){
            setUser(username)
            setlogstatus(true)
            Cookie.set('user',username,{expires:1})
        }

    }
    const Render = () =>{
        setRerender(!rerender)
    }
    const Logout = ()=>{
        Cookie.remove('user')
        setlogstatus(false)
        Render()
    }
    
    return(
        
        <div className='pageContainer-home'>
            {!loggedin ? (<Login setlogin={setLogin}/>) :
            (
            <>
            <header className='navbar-home'>
                <ul className='list-home'>
                    <li className='addButton-container'><AddButton render={Render}/></li>
                    <li className='historyButton-container'><a className="historybutton-home" href="./history">History</a></li>
                    <li className='heading-home'>ToDo-List</li>
                    <li class="centered-li"><h3 className='user-home'>Welcome {user}</h3></li>
                    <button className='logout-button' onClick={Logout}>Logout</button>
                </ul>
            </header>
            <DataBase rerender={Render}/>
            <footer className='footer'>
                
            </footer>
            </>
            )}
        </div>
    )
}
