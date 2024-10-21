import React, { useState } from 'react';
import { Grid, TextField, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ username, onLogout, onSearch }) => {
  // Initialize keyword for searching and navigate through useNavigate
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); 

  // Searching function
  const handleSearch = () => {
    if (onSearch && keyword) {
      onSearch(keyword);
    }
  };

  // Clear any session-related information here
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }

    // Navigate back to the Login page and clear user session
    navigate("/", { state: { username: "" } });
  };

  return (
    <Grid container alignItems="center" style={{ padding: '10px 10px 10px 25px', margin: '0px', backgroundColor: '#333', color: '#fff' }}>
      <Grid item xs={6} sm={3}>
        <h2>News Webpage Finder</h2>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField label="Search for News" // Search for News input field
          variant="outlined"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} 
          fullWidth
          style={{ backgroundColor: '#fff' }}
        />
      </Grid>
      <Grid item xs={6} sm={2} style={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSearch} // Search button
        sx={{ 
        backgroundColor: '#ffca17',
        color: '#6e570b',
        '&:hover': {
          backgroundColor: '#8a7328',
          color: '#ffffff',
        },
        }}>
          Search
        </Button>
      </Grid>
      <Grid item xs={6} sm={3} style={{ textAlign: 'center' }}>
        <Chip label={`Welcome, ${username}!`} color="primary" /> {/* Message to welcome the user */}
        <Button variant="contained" onClick={handleLogout}  // Logout Button
          sx={{
          marginLeft: '10px',
          backgroundColor: '#ffca17',
          color: '#6e570b',
          '&:hover': {
            backgroundColor: '#8a7328',
            color: '#ffffff',
          },
        }}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
