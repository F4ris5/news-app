import React, { useState } from 'react';
import { Grid, Button, LinearProgress  } from '@mui/material';
import NewsItem from '../NewsItem/NewsItem';
import { useEffect } from 'react';

const API_KEY = '8bcecf5bf6504f9eb8015e93c71d73dc'; // API key for News API
const PAGE_SIZE = 10; // Variable for results per page

const DisplayResults = ({ initialResults, keyword, onSaveToFavorites }) => {
    
    // State to hold results, set page number results, and handle loading status
    const [results, setResults] = useState(initialResults || []);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);

    // Function to load more results
    const loadMoreResults = async () => {

        setLoading(true);
        // Url for News API (uses API_KEY and PAGE_SIZE)
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&pageSize=${PAGE_SIZE}&page=${pageNo + 1}&apiKey=${API_KEY}`;

        try {
            // Fetching news data from API
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();

            // Append the news data to the existing results
            setResults(prevResults => [...prevResults, ...data.articles]);
            setPageNo(prevPageNo => prevPageNo + 1); // Increment page number for the next load
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setResults(initialResults); // Update results if initialResults prop changes
    }, [initialResults]);

    return (
        <Grid container spacing={2} style={{margin:'0px 5px', width:'99%'}}>
            {results.length === 0 ? (
                <LinearProgress /> // Show progress bar while loading
            ) : (
                results.map((article) => ( // Map the news results to NewsItem component
                    <NewsItem key={article.url} article={article} onSaveToFavorites={onSaveToFavorites} />
                ))
            )}
            <Grid item xs={12}>
                {results.length === 10 && ( // Load more button for more news
                <Button variant="contained" color="primary" onClick={loadMoreResults} disabled={loading} style={{position:'relative', marginLeft:'35vw'}}>
                    {loading ? 'Loading...' : 'Load More'}
                </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default DisplayResults;