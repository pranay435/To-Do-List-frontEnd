import React,{useState} from "react";
import PopUpForm from "./PopUpForm";
import './Home.css'
import FormComponent from "./FormComponent";

export default function AddButton({render}){
    const [isFormVisible,setVisibility] = useState(false);

    const OpenForm = () =>{
        setVisibility(true);
    }

    const CloseForm = () =>{
        setVisibility(false);
    }
 
    return(
        <div >
            <button className='addButton-home' onClick={OpenForm}>Add new</button>
            { isFormVisible && <PopUpForm  onClose={CloseForm} render={render}/>}
        </div>
    );
}