import React from 'react'
import './UserInput.css'
export const Inputprequisite = ({
 charFlag,
 inputlenghtflag
}) => {
  return (
    <div>
           <div>
        <p className={inputlenghtflag}> lenght should be more than 8</p>
        <p className={charFlag}>username contain alpha  numeric  only no special character Eg:@#$%^&* </p>
    </div>
    </div>
  )
}
