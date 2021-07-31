import React from 'react'
import SignalButton from './SignalButton';


function Signals(props) {
    const data = props.data;
    // Idea to increase efficiency: have dictionary of values to check, then dictionary.map((val) => { if val > whatever then <SignalButton>something something</SignalButton> }
    return (
        <div>
            {(parseFloat(data['Short Float']) > 20.0) && (
                <SignalButton
                    signal={data['Short Float']}>
                        Short Float
                </SignalButton>
            )}
            {(parseFloat(data['Rel Volume']) > 3.0) && (
                <SignalButton
                    signal={data['Rel Volume']}>
                        High Rel Volume
                </SignalButton>
            )}
            {(parseFloat(data['Volume']) > 500000.0) && (
                <SignalButton
                    signal={data['Volume']}>
                        This stock is liquid
                </SignalButton>
            )}
            {(parseFloat(data['RSI (14)']) > 60.0) && (
                <SignalButton
                    signal={data['RSI (14)']}>
                        RSI
                </SignalButton>
            )}
            {(parseFloat(data['SMA20']) > 1.0) && (
                <SignalButton
                    signal={"+" + data['SMA20']}>
                        SMA20
                </SignalButton>
            )}
            {(parseFloat(data['SMA200']) > 1.0) && (
                <SignalButton 
                    signal={"+" + data['SMA200']}>
                        SMA200
                </SignalButton>
            )}
            {((parseFloat(data['Shs Float']) / parseFloat(data['Shs Outstand'])) < 50) && (
                <SignalButton
                    signal={(parseFloat(data['Shs Float']) / parseFloat(data['Shs Outstand'])).toFixed(2)}>
                        Shs Float to Shs Outstand
                </SignalButton>
            )}
            {(parseFloat(data['Inst Own']) > 20.0) && (
                <SignalButton
                    signal={data['Inst Own']}>
                        Inst Own
                </SignalButton>
            )}
            {(parseFloat(data['Inst Trans']) > 5.0) && (
                <SignalButton
                    signal={data['Inst Trans']}>
                        Inst Trans
                </SignalButton>
            )}
            {(parseFloat(data['Insider Trans']) > 5.0) && (
                <SignalButton
                    signal={data['Insider Trans']}>
                        Insider Trans
                </SignalButton>
            )}
            {/* {((parseFloat(if 'b' in data['Market Cap'])*1000000000) < 10000000000) && (
                <SignalButton
                    signal={data['Market Cap']}>
                        Low market cap
                </SignalButton>
            )}             */}
        </div>
    )
}

export default Signals
