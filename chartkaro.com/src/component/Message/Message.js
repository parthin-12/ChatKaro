import React from 'react'
import "./Message.css"


const Message = ({user,message,role}) => {
  return (
   <div > 
        {role==="me"?
        <div className='messageBox right'>
            {`You: ${message}`}
        </div>
        :
        <div className={`messageBox ${role}`}>
            {`${user}: ${message}`}
        </div>
        }
    </div>
  )
}

export default Message