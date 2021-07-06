import React from 'react'
import SignalButton from './SignalButton';


function Signals(props) {
    const data = props.data;
    console.log(data);
    // Idea to increase efficiency: have dictionary of values to check, then dictionary.map((val) => { if val > whatever then <SignalButton>something something</SignalButton> }
    return (
        <div>
            {(data['Short Float'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['Rel Volume'] > 3) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['RSI (14)'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['SMA20'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['SMA200'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['Shs Float'] / data['Shs Outstand'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['Inst Own'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['Insider Trans'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
        </div>
    )
}

export default Signals
