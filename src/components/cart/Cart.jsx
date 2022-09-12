import React, { useState ,useEffect} from 'react';
import {getUserCart} from "../../api/itemApi";
import {isAuthenticated} from '../../auth';
import Items from '../item/Items'
import {
    Grid,
    Grow,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Cart.css';


export default function Cart(props) {
    const [addcart,
        setAddCart] = useState(true);
    const [items,
        setItems] = useState();
    const [error,
        setError] = useState('');
    const {user, token} = isAuthenticated();

    const loadItems = async() => {
        await getUserCart(user._id,token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setItems(data)
                // data.map((item)=>{
                //     return setItems(items => [...items, item.item])
                // })
            } 
        });
    };
    console.log(items)
    
    useEffect(() => {
        loadItems()
    }, []);
    const [anchorEl,
        setAnchorEl] = useState(null);

     const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open
        ? 'simple-popover'
        : undefined;
    // const emptyCart = () => {return(<h3>Cart is Empty</h3>)}  
    return (
        <div>
            <Grow in>
                <Grid className='home-container' container alignItems="stretch" spacing={3}>
                    {items
                        ? items.map((prod, i) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                style={{
                                display: 'flex'
                            }}
                                key={i}>
                                <Items item={prod} i={i} addcart={addcart}/>
                            </Grid>
                        ))
                        : null}
                </Grid>
            </Grow>
        </div>
    );
}
