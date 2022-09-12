import React, {useEffect,useState} from 'react';
import {Box, Tab, Tabs ,Grow,Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {getItems} from "../../api/itemApi";
import Item from '../item/Item';
import './home.css'

export default function Home() {

    const [value,
        setValue] = useState(0);
        const [data,
            setDate] = useState('');
        const [error,
            setError] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const loadItems = async() => {
      await getItems().then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setDate(data);
          }
      });
  };

    useEffect(() => {
      loadItems()
    }, []);
    return (
        <div>
            <Box
                sx={{
                width: '100%',
                bgcolor: 'background.paper'
            }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="HOME" />
                    <Tab label="FOOD"/>
                    <Tab label="ELECTRONICS"/>
                    <Tab label="GAMES"/>
                    <Tab label="FASHION"/>
                </Tabs>
            </Box>
            <Grow in>
                <Grid style={{'padding': '3%','width': '100%'}} className='container' container alignItems="stretch" spacing={3}>
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
                                <Item item={prod} i={i}/>
                            </Grid>
                        )):null}
                </Grid>
            </Grow>
        </div>
    )
}
