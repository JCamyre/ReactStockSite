import React from 'react'

function NewsArticle(props) {
    return (
        <div style={{alignItems: 'center'}}>
            <h4>{props.date}</h4>
            <img src={props.img} alt={props.title} />
            <h2>{props.site}</h2>
            <a href={props.link} target='_blank' rel="noreferrer">
                <h3>{props.title}</h3>
            </a>
        </div>
    )
}

export default NewsArticle
