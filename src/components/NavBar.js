import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { cartState } from './cart/store';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useAddListItem } from './cart/store';
import { cart } from './cart/store';
import CurrentUser from './CurrentUser';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/Home';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);



export default function NavBar() {
    const [tiles, setTiles] = useState([]);
    const addListItem = useAddListItem();
    const classes = useStyles();
    const { totalQty } = useRecoilValue(cartState);
    const cartItems = useRecoilValue(cart);

    const [drawer, setDrawer] = React.useState({
        right: false,
    });

    useEffect(() => {
        var resp = getTiles();
    }, [])

    async function getTiles() {
        var tileList = [];
        var resp = await axios.get("http://localhost:8080/cart/all/by/user")
            .then(response => response.data)
            .then((data) => {
                data.map((d) => {
                    var tile = {
                        id: d.id,
                        price: d.price,
                        qty: d.qty,
                        src: d.src,
                        tileCode: d.tileCode,
                    }
                    tileList = [...tileList, tile];
                })
                return tileList;
            }).catch((error) => {
                console.error("Error gets - " + error);
            });
        setTiles(resp);
    }

    useEffect(() => {
        if (tiles) {
            for (var i = 0; i < tiles.length; i++) {
                addListItem(tiles);
            }
        }

    }, [tiles])




    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={() => setDrawer({ 'right': false })}
            onKeyDown={() => setDrawer({ 'right': false })}
        >

            <List>
                <ListItem button style={{ backgroundColor: 'DodgerBlue', display: 'flex', justifyContent: 'center', color: 'white' }}>
                    <ListItemIcon><QueuePlayNextIcon style={{ height: 50, width: 50 }} /></ListItemIcon>
                </ListItem>
            </List>
            <Divider />
            <List>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <Typography variant="p">
                            Home
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/products">
                    <ListItem button>
                        <ListItemIcon><LocalMallIcon /></ListItemIcon>
                        <Typography variant="p">
                            Products
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/view/update/MyProfile">
                    <ListItem button>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <Typography variant="p">
                            My Profile
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/cartbox">
                    <ListItem button>
                        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                        <Typography variant="p">
                            Your Cart
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/recivedOrder">
                    <ListItem button>
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <Typography variant="p">
                            Recived Order
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/admin">
                    <ListItem button>
                        <ListItemIcon><LocalMallIcon /></ListItemIcon>
                        <Typography variant="p">
                            Admin WorkBox
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </div >
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setDrawer({ 'right': true })}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to="/">
                            <h1 style={{ color: 'white' }}>Ayan</h1>
                        </Link>
                    </Typography>


                    <div>
                        <CurrentUser />
                    </div>
                    <div>
                        <Link className="ui button primary" to="cartbox">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={totalQty} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </div>
                    {/*
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        </div>  */}
                    <div>
                        <SwipeableDrawer
                            anchor={'right'}
                            open={drawer['right']}
                            onClose={() => setDrawer({ 'right': false })}
                            onOpen={() => setDrawer({ 'right': true })}
                        >
                            {list('right')}
                        </SwipeableDrawer>
                    </div>
                </Toolbar>
            </AppBar>
        </div >

    );
}
