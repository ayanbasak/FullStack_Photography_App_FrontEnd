import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ROCarts(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {props.tiles.map((t) => (
                <div key={t.id}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Tile Image"
                                height="140"
                                image={t.src}
                                title="Tile Image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">Price: ₹{t.price}</Typography>
                                <Typography gutterBottom variant="h5" component="h2">Tile Quantity: {t.qty}</Typography>
                                <Typography gutterBottom variant="h5" component="h2">Tile Unique Code: {t.tileCode}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ))}

        </div>
    );



    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                View Tiles
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

