import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const menuItems = [
    { label: 'Stories', path: '/stories' },
    { label: 'Categories', path: '/categories' },
    { label: 'Chatbot', path: '/chatbot' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'white' 
          }}
        >
         KathaNidhi 
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.path} 
                  component={Link} 
                  to={item.path}
                  onClick={handleClose}
                >
                  {item.label}
                </MenuItem>
              ))}
              {user ? (
                [
                  <MenuItem key="create" component={Link} to="/create" onClick={handleClose}>
                    Write Story
                  </MenuItem>,
                  <MenuItem key="profile" component={Link} to="/profile" onClick={handleClose}>
                    Profile
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="login" component={Link} to="/login" onClick={handleClose}>
                    Login
                  </MenuItem>,
                  <MenuItem key="register" component={Link} to="/register" onClick={handleClose}>
                    Register
                  </MenuItem>
                ]
              )}
            </Menu>
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit" 
                component={Link} 
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/create">
                  Write Story
                </Button>
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
