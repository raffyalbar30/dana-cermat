import React from 'react'

export default function Buttons({
    Classparrent, 
    Classchild, 
    Classbutton, 
    Title, 
    onClick, 
    disabled

}) {
  return (
    <div className={Classparrent}>
       <div className={Classchild}>
           <button type="button" onClick={onClick} className={Classbutton} disabled={disabled}> {Title} </button>
       </div>
    </div>
  )
}
