import React from 'react'
import { useParams } from 'react-router'

export const NoticeInput = () => {
    const {username}=useParams()
    console.log(username)
  return (
    <div></div>
  )
}
