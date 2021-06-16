import './NeonButton.css'
import React from 'react'

export const NeonButton = ({children, href}) => {
    return (
        // Change from <a/> tag to Link. 
        <a href={href} className='neon-button'>
            {children}
        </a>
    )
}

