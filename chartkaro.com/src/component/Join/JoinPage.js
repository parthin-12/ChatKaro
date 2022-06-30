import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./JoinPage.css"
import Logo from "../../Images/CK_LOGO.png"

export let user;

const JoinPage = () => {

  const [name, setName] = useState("");
  const navigate=useNavigate();

  const submitFormHandler=(e)=>{
    e.preventDefault();
    if(name.trim()){
      user=name;
      document.getElementById("nameId").value=""
      navigate("/chat");
    }
    else
      return;
  }

  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img src={Logo} alt="Logo"/>
        <h1>Chat<div>Karo.com</div></h1>
        <form className='userForm' onSubmit={submitFormHandler}>
          <input type="text" id="nameId" required placeholder='Enter Your Name...' onChange={(e)=>(setName(e.target.value))}/>
          <input type="submit" className='btn' value="JOIN CHAT"/>
        </form>
      </div>
    </div>
  )
}

export default JoinPage;