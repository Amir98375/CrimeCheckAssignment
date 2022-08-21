import React from 'react'
import { useState } from 'react'
import './UserInput.css'
import axios from "axios"
import { Inputprequisite } from './Inputprequisite'
import { useNavigate } from 'react-router'
export const UserInput = () => {
    const navigate=useNavigate()
    const [userinput,setuserinput]=useState('')
    const [Prerequisite,setPrerequisite]=useState(false)
    const [check,setcheck]=useState({
        usernamelength:false,
        userchar:false
    })
    const handleChange=(e)=>{
          setuserinput(e.target.value)
    }
    const handleFocus=()=>{
        setPrerequisite(true)
      }
      const handlekeyUp=(e)=>{
        const {value}=e.target
      
       
        const usernamelength=value.length>=8 && value.length<=20;
        const userchar=/([a-z].*[0-9])|([0-9].*[a-z])/.test(value);
        setcheck({
       usernamelength,
       userchar
        })
          }
//    console.log(userinput)
    const postdata=()=>{
        let data={
            username:userinput
        }
    
        axios.post(`https://crime-check98.herokuapp.com/crimes`,data)
        .catch((err)=>{
            console.log(err)
        })
        navigate(`/notice/${userinput}`)
    }
  return (
    <div>
        <input type="text" value={userinput} placeholder='enter you user name' 
        className='inputuser'
        onFocus={handleFocus} onKeyUp={handlekeyUp} onChange={handleChange} />
        <br />
        {Prerequisite?<Inputprequisite
  
    charFlag={check.userchar?"valid":"invalid"}
    inputlenghtflag={check.usernamelength?"valid":"invalid"}
   />:null}
        <button className='buttonuser'
        onClick={postdata} >login</button>
    </div>
  )
}
