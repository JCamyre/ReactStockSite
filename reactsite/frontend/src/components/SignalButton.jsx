import React from 'react'
import './SignalButton.css';

// https://fdossena.com/?p=html5cool/buttons/i.frag
// For the bubble button. https://codepen.io/Grsmto/pen/RPQPPB

function SignalButton(props) {
    return (
        <a href="something" class="button1">{props.children}</a>
    )
}

export default SignalButton
