import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';
import {signout, isAuthenticated} from "../../auth"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../cart/Cart';

export default function Menu() {
    const navigate = useNavigate();
    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                        mr: 2
                    }}></IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                        flexGrow: 1
                    }}
                        onClick={() => navigate('/')}>
                        Store
                    </Typography>
                    {isAuthenticated()
                        ? <React.Fragment>
                                <ShoppingCartIcon className='cart' variant="contained" onClick={() => navigate('/cart')}/>
                                <Button color="inherit" onClick={() => navigate('/favourites')}>Favourites</Button>
                                <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                                <Button color="inherit" onClick={() => navigate('/dashboard/createitem')}>Create</Button>
                                <Button color="inherit" onClick={() => signout()}>log Out</Button>
                            </React.Fragment>
                        : <React.Fragment>
                            <Button color="inherit" onClick={() => navigate('/signin')}>Log In</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </React.Fragment>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
