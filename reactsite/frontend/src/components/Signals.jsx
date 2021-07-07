import React from 'react'
import SignalButton from './SignalButton';


function Signals(props) {
    const data = props.data;
    console.log(data);
    // Idea to increase efficiency: have dictionary of values to check, then dictionary.map((val) => { if val > whatever then <SignalButton>something something</SignalButton> }
    return (
        <div>
            {(parseFloat(data['Short Float']) > 20.0) && (
                <SignalButton>Short Float</SignalButton>
            )}
            {(parseFloat(data['Rel Volume']) > 3.0) && (
                <SignalButton>Rel Volume</SignalButton>
            )}
            {(parseFloat(data['RSI (14)']) > 60.0) && (
                <SignalButton
                    signal={data['RSI (14)']}
                >
                    RSI
                </SignalButton>
            )}
            {(parseFloat(data['SMA20']) > 1.0) && (
                <SignalButton>SMA20</SignalButton>
            )}
            {(parseFloat(data['SMA200']) > 1.0) && (
                <SignalButton signal={data['SMA200']}>SMA200</SignalButton>
            )}
            {((parseFloat(data['Shs Float']) / parseFloat(data['Shs Outstand'])) < 50) && (
                <SignalButton>Shs Float percentage</SignalButton>
            )}
            {(parseFloat(data['Inst Own']) > 20.0) && (
                <SignalButton>Inst Own</SignalButton>
            )}
            {(parseFloat(data['Inst Trans']) > 5.0) && (
                <SignalButton>Inst Trans</SignalButton>
            )}
            {(parseFloat(data['Insider Trans']) > 5.0) && (
                <SignalButton>Insider Trans</SignalButton>
            )}
            {(parseFloat(data['Market Cap']) < 50000000) && (
                <SignalButton>Low market cap</SignalButton>
            )}            
        </div>
    )
}

export default Signals
