import React from 'react';

export default function Label({ Children, ClassText }) {
  return (
     <span className={ClassText}>{ Children }</span>
  )
}
 