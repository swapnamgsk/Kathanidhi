import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  CardActionArea
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  
  // Extract the category ID from the path
  const categoryId = category.path.split('/').pop();

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
        }
      }}
    >
      <CardActionArea 
        onClick={() => navigate(`/categories/${categoryId}`)}
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                backgroundColor: `${category.color}15`,
                borderRadius: '50%',
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {React.cloneElement(category.icon, {
                sx: { 
                  fontSize: 40,
                  color: category.color
                }
              })}
            </Box>
            <Typography 
              variant="h6" 
              component="h2"
              gutterBottom
              sx={{ 
                color: 'text.primary',
                fontWeight: 'bold'
              }}
            >
              {category.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mb: 1,
                lineHeight: 1.6
              }}
            >
              {category.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
