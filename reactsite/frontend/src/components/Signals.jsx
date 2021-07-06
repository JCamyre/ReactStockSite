import React from 'react'
import SignalButton from './SignalButton';


function Signals(props) {
    const data = props.data;
    console.log(data);
    // Idea to increase efficiency: have dictionary of values to check, then dictionary.map((val) => { if val > whatever then <SignalButton>something something</SignalButton> }
    return (
        <div>
            {(data['short_float'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['relative_volume'] > 3) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['rsi'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['SMA20'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['SMA200'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['Shs_float'] / data['shs_outstand'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['inst_own'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
            {(data['insider_trans'] > 20) && (
                <SignalButton>yo</SignalButton>
            )}
        </div>
    )
}

export default Signals
