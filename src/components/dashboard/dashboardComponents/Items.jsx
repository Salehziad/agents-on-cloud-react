import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UseStyles from '../styles';
import {useNavigate} from 'react-router-dom';
import {deleteItem} from '../../../api/itemApi'
import {isAuthenticated} from '../../../auth';
import Swal from 'sweetalert2'


export default function Items({item}) {
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

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

    function handleDelete(){
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                setShow(false)
                deleteItem(_id,user._id,token)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
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
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {location}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate(`/dashboard/updateItem/${_id}`)}>update</Button>
                    <Button size="small" onClick={handleDelete}>Delete</Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
}
