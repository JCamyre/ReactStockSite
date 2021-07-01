import React, { useState } from 'react';
import NewsArticle from './NewsArticle';
import DotLoader from 'react-spinners/DotLoader';
import { useDebounce } from "../hooks/debounceHook";

function News(ticker) {
    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(false); 
    const [isNews, setIsNews] = useState(false);
    
    ticker = ticker['ticker'];

    const getNews = async() => {
        setLoading(true);

        const response = await fetch('http://localhost:8000/stocks/get-news?ticker=' + ticker)
            .catch((err) => {
                console.log('Error: ', err);
            })

            if(response){
                if(!response.data || response.data.length===0) setIsNews(false);
                
                setNews(response.data['news-sentiment']);
                console.log(response.data['news-sentiment']);
                setIsNews(true);
            }
        setLoading(false);
        // can do an ifstatement separate from .then if it doesn't work.
    };

    useDebounce(ticker, 500, getNews);
    console.log(news);

    return (
        <div>
            {!isLoading && (
                <>
                    {news.map((article) => (
                        <NewsArticle 
                            url={article.url}
                            title={article.title}
                        />
                    ))}
                </>
            )}
            {/* {isLoading && (
              <DotLoader loading color='#000' size={35} />
            )} */}
            {!isLoading && !isNews && (
                <h3>Sorry, there is no news!</h3>
            )}
        </div>
    )
}

export default News
