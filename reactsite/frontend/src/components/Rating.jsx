import React from 'react';
import './Rating.css';

function Rating(props) {
    // Different categories of ratings: Overall rating, breakdown categories. I'll have two ratings, one for momentum play (slightly high RSI, above all SMA's, increasing volume), one for good deal (more volume on good days than bad, below 45 RSI, oversold, etc)
    // Momentum rating: , Good buy rating: , Value rating (fundamentals)

    const Momentum = (data) => {
        const rsi = data['RSI (14)'] / 70; // lower the better
        const sma20 = data['SMA20'] > 0;
        const sma200 = data['SMA200'] > 0;
        const relvol = data['Rel Vol'] > 3;
        // increasing volume/accumlation
        // for adx/adl, if adl +% and stock price +%, then good.
        return rsi.toFixed(2);
    };
    

    const Deal = (data) => {
        const rsi = data['RSI (14)'] / 40; // lower the better
        const sma20 = data['SMA20'] > 0;
        const sma200 = data['SMA200'] > 0;
        const relvol = data['Rel Vol'] > 3;
        // increasing volume/accumlation
        return rsi.toFixed(2);
    };
    

    return (
        <div>
            <h3>Momentum:</h3>
            <div class='ratingbutton'>
                <h2>{Momentum(props.data)}</h2>
                <h4>/10</h4>
            </div>
            <h3>Deal:</h3>
            <div class='ratingbutton'>
                <h2>{Deal(props.data)}</h2>
                <h4>/10</h4>
            </div>
        </div>
    )
}

export default Rating
