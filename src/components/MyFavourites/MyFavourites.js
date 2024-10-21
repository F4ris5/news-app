import React from 'react';
import { Grid, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MyFavourites = ({ favorites, onClearFavorites, onDeleteFavorite }) => {

  return (
    <Grid 
      container 
      direction="column"
      spacing={2} 
      style={{ 
        padding: '30px',
        margin: '-32px 0px 0px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <Grid item>
        <Typography variant="h6">My Favourites: {favorites.length}</Typography> {/* Display number of favorites */}
      </Grid>
      <Grid item>
        <Button // Clear all favorites
          variant="contained" 
          color="secondary" 
          onClick={onClearFavorites}
          sx={{ backgroundColor: '#2b2b2b' }}
        >
          Clear All
        </Button>
      </Grid>

      {favorites.length > 0 ? ( // Check if there are favorites
        favorites.map((news, index) => ( // Map over favorites array
          <Grid 
            container 
            item 
            key={index}
            alignItems="center"
            justifyContent="space-between"
            style={{ cursor: 'pointer' }}
          >
            <Typography 
              variant="body2" 
              onClick={() => window.open(news.url, '_blank')}
            >
              {news.title}
            </Typography>
            <IconButton 
              aria-label="delete"
              onClick={() => onDeleteFavorite(news.url)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            No favorites saved.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MyFavourites;