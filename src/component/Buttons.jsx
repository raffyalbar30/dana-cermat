import React from 'react'

export default function Buttons({
    Classparrent, 
    Classchild, 
    Classbutton, 
    Title, 
    onClick, 
    disabled, 
    type

}) {
  return (
    <div className={Classparrent}>
       <div className={Classchild}>
           <button type={type} onClick={onClick} className={Classbutton} disabled={disabled}> {Title} </button>
       </div>
    </div>
  )
}
