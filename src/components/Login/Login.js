import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import backgroundImage from '../background-image.jpg'; // Background image for the login page

const Login = () => {
  // State variables to manage loading state, snackbar visibility, messages, and user input
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle login action
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Validate username and password
      if (username === 'john' && password === '12345') {
        setSnackbarMessage("Login Successful!");
        setSnackbarSeverity("success");
        
        navigate("/home", { state: { username } });
      } else {
        setSnackbarMessage("Invalid Username or Password!");
        setSnackbarSeverity("error");
      }
      setOpenSnackbar(true);
    }, 2000);
  };

  // Function to close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "2rem",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", color: "#000", fontWeight: "bold" }} 
        >
          News Webpage Finder
        </Typography>

        {loading && <LinearProgress style={{ marginBottom: "1rem" }} />}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="User Name" // Username input
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password" // Password input
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button // Button for logging in
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#ff5722",
                color: "#fff",
                padding: "0.57rem",
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};

export default Login;