import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useAddItem } from '../cart/store';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1920,
        [theme.breakpoints.down('sm')]: {
            width: 600,
        },
        [theme.breakpoints.up('md')]: {
            width: 960,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1280,
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export default function SingleProductView(props) {
    const [tile, setTile] = useState(props.tile);
    const classes = useStyles();
    const addItem = useAddItem();

    function addTocart() {
        var newTile = {
            id: tile.id,
            price: tile.price,
            src: tile.src,
            tileCode: tile.tileCode,
        }
        addItem(newTile);
    }


    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={tile.src} title="Paella dish" />

            <CardContent>
                <Grid container direction="row" justify="space-around" alignItems="center" >
                    <Button variant="contained" color="primary" size="large" className={classes.button} onClick={addTocart} startIcon={<AddIcon />}>
                        Add to Cart
                    </Button>

                    <Button variant="contained" color="secondary" size="large" className={classes.button} onClick={props.closeLightbox} startIcon={<CloseIcon />}>
                        Close
                     </Button>
                    <Grid direction="column" justify="center" alignItems="center" >
                        <Grid item >
                            <h4>Price: <h5>₹{tile.price}</h5></h4>
                        </Grid>
                        <Grid item >
                            <h4>Tile Code: <h5>{tile.tileCode}</h5></h4>
                        </Grid>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}
