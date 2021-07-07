import React from 'react'
import './NewsArticle.css';

// Get articles only from whitelisted sites, pref w an api so randoms new articles aren't returned
function NewsArticle(props) {
    return (
        <div style={{alignItems: 'center'}}>
            <img style={{padding: '5px 20px'}} src={props.img} alt={props.title} />
            <span style={{float: 'left'}}>
                <h4>{props.date}</h4>
                <a href={'//' + props.link} target='_blank' rel="noreferrer">
                    <h2>{props.site}</h2>
                    <h3>{props.title}</h3>
                </a>
            </span>
        </div>
    )
}

export default NewsArticle
