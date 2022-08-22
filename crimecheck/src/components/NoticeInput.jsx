import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import './NoticeInput.css'

export const NoticeInput = () => {
    const {username}=useParams()
    const [textvalue,settextvalue]=useState('')
    const [data,setdata]=useState([])
    const [reversed,setreversed]=useState('')
    useEffect(()=>{
        getData()
    },[])
    // console.log(username)

    const getData=()=>{
       axios.get(`https://crime-check98.herokuapp.com/userPosts`)
       .then((res)=>setdata((res.data)))
    }
    console.log(username)
console.log(textvalue)
    const PostNotice=()=>{
       
        const data={
            username:username,
            notice:textvalue

        }
      console.log(data,'data inside postnotice')
        axios.post(`http://localhost:5100/userPosts`,data)
        getData()
    }
  

  return (
    <div className='container'>
        <h1 className='heading'>Notice Board</h1>
    <textarea className='textclass'
    placeholder='enter your notice here' maxLength="100"
    onChange={(e)=>settextvalue(e.target.value)}></textarea>
    <br />
    <button className='buttontext' onClick={PostNotice}>submit</button>
    {data?.map((el)=>{
        return (
            <div className='main'>
                <p className='para'>  {el.notice}</p>
              <div className='main1'>
              <p className='para' >{el.username}</p>
                <p className='para'>{el.createdAt}</p>
               
              </div>
            </div>
        )
    })}
    </div>
  )
}
