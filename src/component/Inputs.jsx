import React from 'react'

export default function Inputs({ 
    Children, 
    Class, 
    ClassInput, 
    ClassParrent, 
    onChange, 
    hiddenPassword, 
    type, 
    required, 
    pattern
}) {

  return (
 
        <div className={Class}>
            <div className={ClassParrent}>
              <input type={type}  placeholder={ Children } onChange={onChange} className={ClassInput} required={required} pattern={pattern}/>
               {hiddenPassword}
            </div>
        </div>
  ) 
}
 