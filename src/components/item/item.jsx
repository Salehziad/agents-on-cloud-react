import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UseStyles from './styles';
import moment from 'moment';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import {getOneItem} from '../../api/itemApi';
import { useParams } from 'react-router-dom';

export default function Item() {
    const { itemId } = useParams();
    const classes = UseStyles();
    const [item,
        setItem] = useState('');
    const [error,
        setError] = useState('');

    async function loadItem(){
        await getOneItem(itemId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setItem(data);
            }
        });
    }

    useEffect(() => {
        loadItem();
    }, []);

    return (
            <div className={classes.details}>

            <Card
                className={classes.card}
                sx={{
                    maxWidth: 500
            }}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"/>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' componentt='h2'>{item.category}</Typography>
                    <Typography variant='body2' color='textSecondary' componentt='h2'>{item.price}JD</Typography>
                </div>
                <CardContent >
                    <Typography className={classes.pointer} gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography className={classes.pointer} gutterBottom variant="h5" component="div">
                        {item.description}
                    </Typography>
                    <Typography className={classes.pointer} variant="body2" color="text.secondary">
                        {item.location}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' componentt='p'>
                        Added on {moment(item.createdAt).fromNow()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button  size="small">Add To Cart</Button>
                    <FavoriteSharpIcon className={classes.icon}></FavoriteSharpIcon>
                </CardActions>
            </Card>
            <div>
                comments
            </div>
            </div>
    );
}
