import React, { useState } from 'react';
import NewsArticle from './NewsArticle';
import DotLoader from 'react-spinners/DotLoader';

function News(ticker) {
    const [news, setNews] = useState([]);
    const [isLoaded, setLoaded] = useState(true); 
    const [isNews, setIsNews] = useState(false);
    
    ticker = ticker['ticker'];

    const getNews = async() => {
        setLoaded(false);

        const response = await fetch('http://localhost:8000/stocks/get-news?ticker=' + ticker)
            .catch((err) => {
                console.log('Error: ', err);
            })
            .then((response) => {
                if(!response.data || response.data.length===0) setIsNews(false);
                
                setNews(response.data)
                setIsNews(true);
            });

        // can do an ifstatement separate from .then if it doesn't work.
        response();
    };

    useDebounce(searchQuery, 500, searchTicker);


    return (
        <div>
            {isLoaded && (
                <>
                    {news.map((article) => (
                        <NewsArticle 
                            url={article.url}
                            title={article.title}
                        />
                    ))}
                </>
            )}
            {!isLoaded && (
              <DotLoader loading color='#000' size={35} />
            )}
            {isLoaded && !isNews && (
                <h3>Sorry, there is no news!</h3>
            )}
        </div>
    )
}

export default News
