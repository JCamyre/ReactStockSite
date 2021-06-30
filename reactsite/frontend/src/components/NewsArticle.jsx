import React from 'react'

function NewsArticle(props) {
    return (
        <div>
            <a href={props.url}>
                <h3>{props.title}</h3>
            </a>
        </div>
    )
}

export default NewsArticle
