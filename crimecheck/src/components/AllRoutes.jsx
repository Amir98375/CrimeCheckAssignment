import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { NoticeInput } from './NoticeInput'
import { UserInput } from './UserInput'
export const ALLRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<UserInput/>}/>
            <Route path='/notice/:username' element={<NoticeInput/>}/>
        </Routes>
    </div>
  )
}
