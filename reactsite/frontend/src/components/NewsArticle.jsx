import React from 'react'

function NewsArticle(props) {
    return (
        <div>
            <h4>{props.date}</h4>
            <img src={props.img} alt={props.title} />
            <h2>{props.site}</h2>
            <a href={props.url}>
                <h3>{props.title}</h3>
            </a>
        </div>
    )
}

export default NewsArticle
