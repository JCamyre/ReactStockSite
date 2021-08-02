import React, { useState } from 'react';
import NewsArticle from './NewsArticle.jsx';
import DotLoader from 'react-spinners/DotLoader';
import { useDebounce } from "../hooks/debounceHook";
import axios from 'axios';

function News(ticker) {
    const [stockNews, setStockNews] = useState([]);
    const [sectorsNews, setSectorsNews] = useState([]);
    const [isLoading, setLoading] = useState(false); 
    const [isNews, setIsNews] = useState(false);
    
    ticker = ticker['ticker'];

    const getNews = async() => {
        setLoading(true);

        const response = await axios.get('http://localhost:8000/stocks/get-news?ticker=' + ticker)
            .catch((err) => {
                console.log('Error: ', err);
            })

        if(response){
            console.log(response.data);
            if(response.data && response.data.length) setIsNews(false);

            setStockNews(response.data['stock-news-sentiment']);
            setSectorsNews(response.data['sectors-news-sentiment']);
            setIsNews(true);
        }
        setLoading(false);
    };

    useDebounce(ticker, 500, getNews);

    const sectors = sectorsNews.map((sector) => {
        return sector
    })

    return (
        <div style={{padding: '40px 40px'}}>
            {!isLoading && !isNews && (
                <h3>Sorry, there is no news!</h3>
            )}
            <h1>${ typeof(ticker) === 'string' ? (ticker + ' News:') : ''}</h1>
            {isLoading && (
                <>
                    <div style={{height: '100px', padding:'40px 0px'}}>
                        <DotLoader loading color='#000' size={35} />
                    </div>
                </>
            )}
            {!isLoading && (
                <>
                    {stockNews.map((article) => (
                        <NewsArticle
                            link={article.link}
                            title={article.title}
                            date={article.date}
                            img={article.img}
                            site={article.site}
                            key={article.link}
                        />
                    ))}
                </>
            )}
            <h1>Sector(s) news:</h1>
            {isLoading && (
                <>
                    <div style={{height: '100px', padding:'40px 0px'}}>
                        <DotLoader loading color='#000' size={35} />
                    </div>
                </>
            )}
            {!isLoading && (
                <>
                    {sectors.map((article) => (
                        <NewsArticle
                            link={article.link}
                            title={article.title}
                            date={article.date}
                            img={article.img}
                            site={article.site}
                            key={article.link}
                        />     
                    ))}
                </>
            )}
        </div>
    )
}

export default News
