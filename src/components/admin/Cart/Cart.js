import React, { Component } from 'react';

import { Card, Form, Button, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show: false,
            loading: false
        };
        this.bmChange = this.bmChange.bind(this);
        this.submitBM = this.submitBM.bind(this);
    }

    initialState = {
        id: '', userEmail: '', price: '', qty: '', create_At: '', update_At: ''
    };

    componentDidMount() {
        const Id = +this.props.match.params.id;

        if (Id) {
            this.findBMById(Id);
        }
    }

    findBMById = (Id) => {
        this.setState({ loading: true });
        axios.get("http://localhost:8080/cart/" + Id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        userEmail: response.data.userEmail,
                        qty: response.data.qty,
                        price: response.data.price,
                        create_At: response.data.create_At,
                        update_At: response.data.update_At,
                    });
                    this.setState({ loading: false });
                }
            }).catch((error) => {
                console.error("Error - " + error);
                this.setState({ loading: false });
            });
    };

    resetBM = () => {
        this.setState(() => this.initialState);
    };

    submitBM = event => {
        event.preventDefault();
        const bm = {
            userEmail: this.state.userEmail,
            price: this.state.price,
            qty: this.state.qty,
            create_At: this.state.create_At,
            update_At: this.state.update_At,
        };
        this.setState({ loading: true });
        axios.post("http://localhost:8080/cart/add", bm)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true, "method": "post" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({ loading: false });
                } else {
                    this.setState({ "show": false });
                    this.setState({ loading: false });
                }
            });
        this.setState(this.initialState);
    };

    updateBM = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const bm = {
            id: this.state.id,
            userEmail: this.state.userEmail,
            price: this.state.price,
            qty: this.state.qty,
            create_At: this.state.create_At,
            update_At: this.state.update_At,
        };
        axios.post("http://localhost:8080/cart/add", bm)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true, "method": "put" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    setTimeout(() => this.bmList(), 3000);
                    this.setState({ loading: false });
                } else {
                    this.setState({ "show": false });
                    this.setState({ loading: false });
                }
            });

        this.setState(this.initialState);
    };

    bmChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    bmList = () => {
        return this.props.history.push("/CartList");
    };

    render() {
        const { userEmail, qty, price } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "Cart Updated Successfully." : "Cart Saved Successfully."} type={"success"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Cart" : "Add New Cart"}
                    </Card.Header>
                    <Form onReset={this.resetBM} onSubmit={this.state.id ? this.updateBM : this.submitBM} id="bmFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGriduserEmail">
                                    <Form.Label>userEmail  {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control required
                                        type="text" name="userEmail"
                                        value={userEmail} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter userEmail" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridqty">
                                    <Form.Label>qty   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control required
                                        type="number" name="qty"
                                        value={qty} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Quantity" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridprice">
                                    <Form.Label>price   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control required
                                        type="number" name="price"
                                        value={price} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter price" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.bmList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Cart List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}