import React from 'react'
import './SignalButton.css';

// https://codepen.io/Grsmto/pen/RPQPPB

function IndictatorButton() {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="goo">
            <defs>
                <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo"/>
                </filter>
            </defs>
            </svg>

            <span class="button--bubble__container">
            <a href="#campaign" class="button button--bubble">
                Hover me
            </a>
                <span class="button--bubble__effect-container">
                    <span class="circle top-left"></span>
                    <span class="circle top-left"></span>
                    <span class="circle top-left"></span>

                    <span class="button effect-button"></span>

                    <span class="circle bottom-right"></span>
                    <span class="circle bottom-right"></span>
                    <span class="circle bottom-right"></span>
                </span>
            </span>
        </div>
    )
}

export default IndictatorButton
