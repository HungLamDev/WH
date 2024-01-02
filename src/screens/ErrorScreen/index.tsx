import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Error from '../../assets/error.png'
const ErrorScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/");
        }, 5000); 
        return () => clearTimeout(timeout);
    }, [])
    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
            </Grid>
            <Grid xs={6}>
              <img
                src={Error}
                alt=""
                width={500} height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
};

export default ErrorScreen;
