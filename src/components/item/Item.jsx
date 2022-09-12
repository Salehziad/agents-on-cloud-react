import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UseStyles from './styles';
import {useNavigate} from 'react-router-dom';
// import {deleteItem} from '../../../api/itemApi'
import {isAuthenticated} from '../../auth';
import Swal from 'sweetalert2'


export default function Item({item}) {
    const[show,setShow]=React.useState(true)
    const {user, token} = isAuthenticated();
    const navigate = useNavigate();
    const {
        image,
        name,
        location,
        price,
        category,
        _id
    } = item
    const classes = UseStyles();
    return (
        <React.Fragment>
            <Card
                className={classes.card}
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
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {location}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">update</Button>
                    <Button size="small">Delete</Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
}
