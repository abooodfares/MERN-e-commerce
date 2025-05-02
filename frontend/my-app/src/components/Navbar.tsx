import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useauth } from '../context/auth/authcontext';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart/cartcontext';
import { GetCartItems } from '../api/Authapi';
const settings = ['My Orders', 'Account', 'Logout'];


function NavBar() {
  const { products } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const Auth = useauth();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = async () => {
    
    navigate('/login'); // or navigate programmatically if you use react-router
  };

  return (

    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo Icon */}
            <AdbIcon sx={{ display: 'flex', mr: 1 }} />

            {/* Logo Text */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Cart Icon */}
            <Box sx={{ mr: 2 }}>
              <IconButton size="large" color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={products.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>

            {/* Profile or Login Button */}
            <Box sx={{ flexGrow: 0 }}>
              {Auth?.email ? (
                <Tooltip title={Auth.email}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {Auth.email[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button variant="contained" color="secondary" onClick={handleLogin}>
                  Login
                </Button>
              )}

              {/* Only show Menu if logged in */}
              {Auth?.email && (
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                 
                    <MenuItem key={'logout'} onClick={Auth.logout}>
                      <Typography textAlign="center">{'Logout'}</Typography>
                    </MenuItem>
                
                </Menu>
              )}
            </Box>
          </Toolbar>
        </Container>
        
      </AppBar>
    </>
  );
}

export default NavBar;
