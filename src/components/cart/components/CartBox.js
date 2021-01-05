import React, { useState } from "react";
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



const CartBox = (props) => {
    const cartItems = useRecoilValue(cart);
    const { totalCost, totalQty } = useRecoilValue(cartState);
    const [loading, setLoading] = useState(false);

    function saveData() {

        setLoading(true);
        axios.post("http://localhost:8080/cart/add/save", cartItems)
            .then(response => {
                if (response.data != null) {
                    setLoading(false);

                } else {
                    setLoading(false);

                }
                props.history.push("/");

            });
    }

    function confirmOrder() {

        setLoading(true);
        axios.post("http://localhost:8080/ordered/ordered/add/" + totalQty + "/" + totalCost, cartItems)
            .then(response => {
                if (response.data != null) {
                    setLoading(false);
                } else {
                    setLoading(false);
                }
                props.history.push("/");
            });
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading(false);
    };

    return (
        <>
            <div className={{ flexGrow: 1 }}>
                <Paper className={{ textAlign: 'center' }}>
                    <TableContainer component={Paper}>
                        <Table className={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        <Typography variant="h5" gutterBottom>
                                            Details
                                            </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h5" gutterBottom>Price</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Typography variant="h5" gutterBottom>Item</Typography></TableCell>
                                    <TableCell><Typography variant="h5" gutterBottom>Photo</Typography></TableCell>
                                    <TableCell align="right"><Typography variant="h5" gutterBottom>Price</Typography> </TableCell>
                                    <TableCell align="right"><Typography variant="h5" gutterBottom>Qty</Typography> </TableCell>
                                    <TableCell align="right"><Typography variant="h5" gutterBottom>Total</Typography> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell><CartButtons item={item} /></TableCell>
                                        <TableCell><img src={item.src} alt={item.tileCode} style={{ height: 100, width: 100, borderRadius: 10 }} /></TableCell>
                                        <TableCell align="right"><Typography variant="h5" gutterBottom>₹{item.price}</Typography> </TableCell>
                                        <TableCell align="right"><Typography variant="h5" gutterBottom>{item.qty}</Typography> </TableCell>
                                        <TableCell align="right"><Typography variant="h5" gutterBottom>₹{item.qty * item.price}</Typography> </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell colSpan={4}><Typography variant="h5" gutterBottom>Total</Typography> </TableCell>
                                    <TableCell align="right"><Typography variant="h5" gutterBottom>₹{totalCost}</Typography> </TableCell>
                                </TableRow>


                                <TableRow>


                                    <Button variant="contained" color="secondary" onClick={saveData} style={{ margin: 10, backgroundColor: 'Blue' }} >
                                        <Typography variant="h5">
                                            Save This Cart
                                        </Typography>
                                    </Button>

                                    <Button variant="contained" color="secondary" onClick={confirmOrder} style={{ margin: 10, backgroundColor: 'Chocolate' }} >
                                        <Typography variant="h5">
                                            Confirm Order
                                            </Typography>
                                    </Button>

                                    <Link to="/recivedOrder">
                                        <Button variant="contained" color="secondary" style={{ margin: 10, backgroundColor: 'DarkGreen' }} >
                                            <Typography variant="h5">
                                                Your Ongoing Orders
                                                </Typography>
                                        </Button>
                                    </Link>

                                    <Link to="/products">
                                        <Button variant="contained" color="secondary" onClick={saveData} style={{ margin: 10, backgroundColor: 'DarkCyan' }} >
                                            <Typography variant="h5">
                                                View Products
                                                </Typography>
                                        </Button>
                                    </Link>




                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>


                <Snackbar open={loading} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Your Request Saved in Our Server Successfully
                </Alert>
                </Snackbar>

            </div>
        </>
    );
};

export default CartBox;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
