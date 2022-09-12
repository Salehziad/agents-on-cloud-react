import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UseStyles from './styles';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import {isAuthenticated} from '../../auth';
import {addToFavourite,removeFromFavourite,removeFromCart,addToCart} from "../../api/itemApi";
import { useParams } from 'react-router-dom';


export default function Items({item,active,addcart}) {
    const { itemId } = useParams();
    console.log(item)
    const {user, token} = isAuthenticated();
    const[show,setShow]=useState(true)
    const navigate = useNavigate();
    const {
        image,
        name,
        location,
        price,
        category,
        createdAt,
        _id
    } = active||addcart?item.item:item
    const classes = UseStyles();
    const[active1,setActive]= useState(false)

    function handleFavourites(){
        if(active){
            //hide deleted item from favourite
            setShow(false)
            removeFromFavourite(item._id,user._id,token)
        }else{
            // in the home page hide add to fav when click on favourite
            setActive(!active1)
            addToFavourite(_id,user._id,token)
        }
    }

    function handleAddToCart(){
        if(addcart){
            console.log('ss')
            setShow(false)
            removeFromCart(item._id,user._id,token)
        }else{
            addToCart(_id,user._id,token)
        }
    }

    return (
        <React.Fragment>
            <Card
                className={show?classes.card:classes.hide}
                sx={{
                maxWidth: 345
            }}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"/>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' componentt='h2'>{category}</Typography>
                    <Typography variant='body2' color='textSecondary' componentt='h2'>{price}JD</Typography>
                </div>
                <CardContent >
                    <Typography className={classes.pointer} gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography className={classes.pointer} variant="body2" color="text.secondary">
                        {location}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' componentt='p'>
                        Added on {moment(createdAt).fromNow()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>navigate(`/item/${_id}`)}>Show More</Button>
                    {addcart?<Button size="small" onClick={handleAddToCart}>Remove From Cart</Button>:
                    <Button  size="small" onClick={handleAddToCart}>Add To Cart</Button>}
                    {active1?null:
                    <FavoriteSharpIcon onClick={handleFavourites} className={active||active1?classes.activeIcon:classes.icon}></FavoriteSharpIcon>}
                </CardActions>
            </Card>
        </React.Fragment>
    );
}
