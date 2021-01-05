import React, { useState, useEffect } from "react";
import CartButtons from "./CartButtons";
import { useRecoilValue } from "recoil";
import { cart, cartState } from "../store";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SnackBox from "./SnackBox";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ROCarts from "./ROCarts";



const ColorButton = withStyles((theme) => ({
    root: {
        // color: theme.palette.getContrastText(purple[500]),
        backgroundColor: '#b2a300',
        '&:hover': {
            backgroundColor: '#ffea00',
        },
    },
}))(Button);



const RecivedOrder = (props) => {
    const [loading, setLoading] = useState(false);
    //const [openModal, setOpenModal] = React.useState(false);
    const [tiles, setTiles] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    //var [cartItems, setCartItems] = useState();
    //console.log("totalPrice:  ", totalPrice);

    useEffect(() => {
        var totalPrice = 0;
        for (let index = 0; index < tiles.length; index++) {
            totalPrice = totalPrice + tiles[index].totalPrice;
        }
        setTotalPrice(totalPrice);
    }, [tiles])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading(false);
    };

    useEffect(() => {
        var resp = getTiles();
    }, [])

    async function getTiles() {
        var tileList = [];
        var resp = await axios.get("http://localhost:8080/ordered/orderofuser")
            .then(response => response.data)
            .then((data) => {
                data.map((d) => {
                    var tile = {
                        id: d.id,
                        status: d.status,
                        totalPrice: d.totalPrice,
                        totalQty: d.totalQty,
                        userEmail: d.userEmail,
                        userFullname: d.userFullname,
                        carts: d.carts.map((c) => {
                            return c;
                        })
                    }
                    tileList = [...tileList, tile];
                })
                return tileList;
            });
        setTiles(resp);
    }

    return (
        <>
            <div className={{ flexGrow: 1 }}>

                <TableContainer component={Paper}>
                    <Table className={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={7}>
                                    <Typography variant="h5" gutterBottom>
                                        Your ONGOING ORDERS
                                    </Typography>
                                </TableCell>

                            </TableRow>
                            <TableRow>

                                <TableCell><Typography variant="h5" gutterBottom>Order Id</Typography> </TableCell>
                                <TableCell><Typography variant="h5" gutterBottom>Status</Typography> </TableCell>
                                <TableCell><Typography variant="h5" gutterBottom>Total Price</Typography> </TableCell>
                                <TableCell><Typography variant="h5" gutterBottom>Total Quantity</Typography> </TableCell>
                                <TableCell><Typography variant="h5" gutterBottom>User Email</Typography> </TableCell>
                                <TableCell><Typography variant="h5" gutterBottom>User Fullname</Typography> </TableCell>
                                <TableCell><Typography variant="h5" gutterBottom>Tiles</Typography> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tiles.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell><Typography variant="h5" gutterBottom>{item.id}</Typography> </TableCell>
                                    <TableCell><Typography variant="h5" gutterBottom>{item.status}</Typography> </TableCell>
                                    <TableCell><Typography variant="h5" gutterBottom>{item.totalPrice}</Typography> </TableCell>

                                    <TableCell><Typography variant="h5" gutterBottom>{item.totalQty}</Typography> </TableCell>
                                    <TableCell><Typography variant="h5" gutterBottom>{item.userEmail}</Typography> </TableCell>
                                    <TableCell><Typography variant="h5" gutterBottom>{item.userFullname}</Typography> </TableCell>
                                    <TableCell>
                                        <ROCarts tiles={item.carts} />
                                    </TableCell>
                                </TableRow>

                            ))}

                            <TableRow>
                                <TableCell colSpan={4}><Typography variant="h5" gutterBottom>Total: {totalPrice}</Typography> </TableCell>

                            </TableRow>
                            <Paper>

                                <TableRow>
                                    <Link to="/cartbox">
                                        <Button variant="contained" color="secondary" style={{ margin: 10, backgroundColor: 'DarkCyan' }} >
                                            <Typography variant="h5">
                                                View Products
                                            </Typography>
                                        </Button>
                                    </Link>

                                    <Link to="/cartbox">
                                        <Button variant="contained" color="secondary" style={{ margin: 10, backgroundColor: 'FireBrick' }} >
                                            <Typography variant="h5">
                                                View Your Cart
                                        </Typography>
                                        </Button>
                                    </Link>
                                </TableRow>
                            </Paper>
                        </TableBody>
                    </Table>
                </TableContainer>



                <Snackbar open={loading} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Your Request Saved in Our Server Successfully
        </Alert>
                </Snackbar>

            </div>
        </>
    );
};

export default RecivedOrder;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
