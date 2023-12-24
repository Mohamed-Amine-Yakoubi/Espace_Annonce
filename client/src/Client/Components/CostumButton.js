import React from 'react'
import './Scss/CostumButton.scss'
export const CostumButton = (props) => {
  return (
    <div className='CostumButton'> 
        <button {...props}></button>
    </div>
  )
}
