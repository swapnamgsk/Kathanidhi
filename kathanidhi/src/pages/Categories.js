import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';
import CategoryList from '../components/Categories/CategoryList';

const Categories = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Story Categories
        </Typography>
        <CategoryList />
      </Container>
    </Box>
  );
};

export default Categories;
