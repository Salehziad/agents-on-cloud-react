import React, {useEffect} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {useNavigate} from 'react-router-dom';

// import { connect } from 'react-redux'; import { activeCatagory, reset } from
// '../../app/productReducer';

export default function Catagoriesprops() {
    const navigate = useNavigate();
    const [value,
        setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        //  props.activeCatagory('Food')
    }, []);

    return (
        <Box
            sx={{
            width: '100%',
            bgcolor: 'background.paper'
        }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="HOME" onClick={() => navigate('/')}/>
                <Tab label="FOOD"/>
                <Tab label="ELECTRONICS"/>
                <Tab label="GAMES"/>
                <Tab label="FASHION"/>
            </Tabs>
        </Box>
    );
}
