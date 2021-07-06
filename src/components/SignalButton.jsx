import React from 'react'
import './SignalButton.css';

// https://fdossena.com/?p=html5cool/buttons/i.frag
// For the bubble button. https://codepen.io/Grsmto/pen/RPQPPB
// Hovering over button shows the stats. Ex: <Button>Short Float</Button>, message: $INTC has a very high short float of 34%, which could lead to a short squeeze.

function SignalButton(props) {
    return (
        <a href="something" class="button1">{props.children}</a>
    )
}

export default SignalButton
