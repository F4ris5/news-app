import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import MyFavourites from "../MyFavourites/MyFavourites";
import DisplayResults from "../DisplayResults/DisplayResults";
import backgroundImage from '../background-image.jpg';

const API_KEY = '8bcecf5bf6504f9eb8015e93c71d73dc'; // API key for News API
const PAGE_SIZE = 10; // Number of results per page

const Home = () => {
  // State variables to hold search results, current keyword, and favorite articles
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Get the current location and navigation function
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract username from the location state or default to "Guest"
  const username = location.state?.username || "Guest";
  
  // Effect to load saved favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favourite')) || [];
    setFavorites(savedFavorites); // Update state with saved favorites
  }, []);

  // Function to fetch news articles based on a keyword
  const fetchNews = async (keyword, pageSize, pageNo = 1) => {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&pageSize=${pageSize}&page=${pageNo}&apiKey=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.articles); // Update search results state
    } catch (error) {
      console.error(error);
    }
  };

  // Handle search action
  const handleSearch = (keyword) => {
    setKeyword(keyword);
    fetchNews(keyword, PAGE_SIZE);
  };

  // Add an article to favorites
  const handleAddToFavorites = (article) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favourite')) || [];
    const newFavorite = {
      title: article.title,
      url: article.url,
    };
    
    // Check if the article is already in favorites
    if (!savedFavorites.some(fav => fav.url === article.url)) {
      const updatedFavorites = [...savedFavorites, newFavorite];
      localStorage.setItem('favourite', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      alert("This article is already in your favorites.");
    }
  };

  // Clears all favorites
  const handleClearFavorites = () => {
    localStorage.removeItem('favourite');
    setFavorites([]);
  };

  // Delete a specific favorite article
  const handleDeleteFavorite = (url) => {
    const updatedFavorites = favorites.filter(fav => fav.url !== url);
    setFavorites(updatedFavorites);
    localStorage.setItem('favourite', JSON.stringify(updatedFavorites));
  };

  // Handle user logout
  const handleLogout = () => {
    navigate("/", { state: { username: "" } });
  };

  return (
    <Grid container className="main-container" direction="column">
      <Grid className="header-container" item lg={1}>
        <Header onSearch={handleSearch} username={username} onLogout={handleLogout} />
      </Grid>
      <Grid className="content-container" item lg={11}>
        <Grid container direction="row">
          <Grid className="left-panel-container" item lg={2.5}>
            <MyFavourites 
              favorites={favorites} 
              onClearFavorites={handleClearFavorites} 
              onDeleteFavorite={handleDeleteFavorite}
            />
          </Grid>
          <Grid className="result-container" item lg={9.5} 
          style={{
            margin: '-31px 0px 0px',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}>
            <DisplayResults 
              initialResults={searchResults} 
              keyword={keyword} 
              onSaveToFavorites={handleAddToFavorites} 
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;