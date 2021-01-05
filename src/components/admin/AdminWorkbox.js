import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import LocalMallIcon from '@material-ui/icons/LocalMall';

import TileList from "../admin/Tile/TileList";
import CartList from "../admin/Cart/CartList";
import OrderedItemsList from "../admin/OrderedItems/OrderedItemsList";
import { Container, Col, Row, Button } from 'react-bootstrap';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const AdminWorkbox = () => {
    return (
        <div>
            <div style={{ backgroundColor: "#757de8", color: "white", paddingTop: 20, paddingBottom: 20 }}>
                <Container>
                    <Row>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ backgroundColor: "#3f51b5" }}
                        >
                            <Typography variant="h2" gutterBottom>
                                Admin Work-Box
                            </Typography>
                        </Grid>
                    </Row>
                    <Row>
                        <Col style={{ backgroundColor: "#757de8" }} >
                            <LineStyleIcon style={{ height: 250, width: 250 }} />
                        </Col>
                        <Col style={{ backgroundColor: "#002984" }}>
                            <Row style={{ margin: 20 }}>
                                <Link to="/addOrderedItems">
                                    <Button variant="danger" size="lg" block>
                                        Add OrderedItems
                                    </Button>
                                </Link>
                                <Link to="/OrderedItemsList">
                                    <Button variant="danger" size="lg" block style={{ marginLeft: 20 }}>
                                        OrderedItems List
                                    </Button>
                                </Link>
                            </Row>
                            <Row style={{ margin: 20, marginLeft: 20 }}>
                                <Link to="/addTile">
                                    <Button variant="warning" size="lg" block>
                                        Add Tile
                                    </Button>
                                </Link>
                                <Link to="/TileList">
                                    <Button variant="danger" size="lg" block style={{ marginLeft: 20 }}>
                                        Tile List
                                    </Button>
                                </Link>
                            </Row>
                            <Row style={{ margin: 20 }}>
                                <Link to="/addCart">
                                    <Button variant="info" size="lg" block>
                                        Add Cart
                                    </Button>
                                </Link>
                                <Link to="/CartList">
                                    <Button variant="info" size="lg" block style={{ marginLeft: 20 }}>
                                        Cart List
                                    </Button>
                                </Link>
                            </Row>
                            <Row style={{ margin: 20 }}>
                                <Link to="/addUser">
                                    <Button variant="warning" size="lg" block>
                                        Add User
                                    </Button>
                                </Link>
                                <Link to="/listUser">
                                    <Button variant="info" size="lg" block style={{ marginLeft: 20 }}>
                                        User List
                                    </Button>
                                </Link>
                            </Row>
                            <Row style={{ margin: 20 }}>
                                <Link to="/addContactUs">
                                    <Button variant="warning" size="lg" block>
                                        Add ContactUs
                                    </Button>
                                </Link>
                                <Link to="/ContactUsList">
                                    <Button variant="info" size="lg" block style={{ marginLeft: 20 }}>
                                        ContactUs List
                                    </Button>
                                </Link>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <OrderedItemsList />
            </div>
        </div>
    )
}

export default AdminWorkbox