import React, {useState, useEffect} from 'react';
import {getUserItems} from "../../api/itemApi";
import {isAuthenticated} from '../../auth';
import UseStyles from './styles';
import {
    Grid,
    Grow
} from '@material-ui/core';
import Items from './dashboardComponents/Items';
export default function Dashboard() {
    const classes = UseStyles();
    const [data,
        setDate] = useState('');
    const [error,
        setError] = useState('');
     
    const {user, token} = isAuthenticated();

    const loadProductsByArrival = async() => {
        await getUserItems(user._id,token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setDate(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
    }, []);
    return (
        <div>
            {/* <DashBoardTags/> */}
            <Grow in>
                <Grid style={{'padding': '3%','width': '100%'}} className={classes.container} container alignItems="stretch" spacing={3}>
                    {data?data.map((prod, i) => (
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
                                <Items item={prod} i={i}/>
                            </Grid>
                        )):null}
                </Grid>
            </Grow>
        </div>
    )
}