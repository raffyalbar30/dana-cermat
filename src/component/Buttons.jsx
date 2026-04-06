import React from 'react'

export default function Buttons({
    Classparrent, 
    Classchild, 
    Classbutton, 
    Title
}) {
  return (
    <div className={Classparrent}>
       <div className={Classchild}>
           <button type="button" className={Classbutton}> {Title} </button>
       </div>
    </div>
  )
}
