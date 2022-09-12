import React, {useEffect,useState} from 'react';
import {Grow,Grid} from '@mui/material';
import {getItems} from "../../api/itemApi";
import Item from '../item/Items';
import './home.css'

export default function Home() {

        const [items,
            setItems] = useState('');
        const [error,
            setError] = useState('');


    const loadItems = async() => {
      await getItems().then(data => {
          if (data.error) {
              setError(data.error);
          } else {
            setItems(data);
          }
      });
  };

    useEffect(() => {
      loadItems()
    }, []);
    return (
        <div>
            <Grow in>
                <Grid className='home-container' container alignItems="stretch" spacing={3}>
                    {items?items.map((prod, i) => (
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
