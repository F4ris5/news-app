import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import Favorite icon

const NewsItem = ({ article, onSaveToFavorites }) => {
  // Destructure article properties for easier access
  const { source, publishedAt, urlToImage, title, url } = article;

  // Function to handle saving the article to favorites
  const handleSaveToFavorites = () => {
    onSaveToFavorites(article);
  };

  return (
    <Grid item xs={12} sm={6} md={4}> {/* Grid item to display the news article */}
      <Card 
        style={{ marginBottom: '20px', cursor: 'pointer' }}
        onClick={() => window.open(url, '_blank')} // Open the article in a new tab on click
      >
        <CardMedia
          component="img"
          height="140"
          image={urlToImage || require('../NoImage.jpg')} // Fallback image if no URL is provided
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" component="div"> {/* Title of the article */}
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary"> {/* Source of the article */}
            Source: {source.name}
          </Typography>
          <Typography variant="body2" color="text.secondary"> {/* Publication date */}
            Published: {new Date(publishedAt).toLocaleString()}
          </Typography>
        </CardContent>
        <IconButton // Button to add to favourites
          aria-label="add to favorites"
          onClick={(e) => {
            e.stopPropagation();
            handleSaveToFavorites();
          }}
          style={{ position: 'relative', top: '1px', right: '1px' }}
        >
          <FavoriteIcon color="secondary" style={{ color: '#e31251' }} />
        </IconButton>
      </Card>
    </Grid>
  );
};

export default NewsItem;
