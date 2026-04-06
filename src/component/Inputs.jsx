import React from 'react'

export default function Inputs({ 
    Children, 
    Class, 
    ClassInput, 
    ClassParrent
}) {

  return (
 
        <div className={Class}>
            <div className={ClassParrent}>
              <input type="text"  placeholder={ Children } className={ClassInput}/>
            </div>
        </div>
  ) 
}
 