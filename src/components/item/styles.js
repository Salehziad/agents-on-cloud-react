import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    details:{
        display: 'flex',
        justifyContent: 'center'
        },
    media: {
        height: 250,
        minWidth:350
    },
    border: {
        border: 'solid'
    },
    fullHeightCard: {
        height: '100%'
    },
    card: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '10px solid white',
    },
    activeCard: {
        borderBottom: '10px solid #22289a'
    },
    grid: {
        display: 'flex'
    },
    details: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    title: {
        padding: '0 16px'
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: 'none'
    },
    card1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'white'
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    container: {
        marginTop: '1%',
        padding: '2%',
        width: '100%',
        margin: 0
    },
    pointer:{
        cursor: 'pointer'
    },
    icon:{
        cursor: 'pointer',
        color:"black",
        fontSize:"35px",
        marginLeft : 'auto',
    },
    activeIcon:{
        color:"red",
        cursor: 'pointer',
        fontSize:"35px",
        marginLeft : 'auto',
    },
    hide:{
        display:"none",
    }

});