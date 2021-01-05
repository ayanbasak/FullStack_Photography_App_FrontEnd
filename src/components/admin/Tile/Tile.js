import React, { Component } from 'react';

import { Card, Form, Button, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';

export default class Tile extends Component {

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
        id: '', imgLink: '', tileCode: '', size: '', price: '', create_At: '', update_At: ''
    };

    componentDidMount() {
        const Id = +this.props.match.params.id;
        if (Id) {
            this.findBMById(Id);
        }
    }

    findBMById = (Id) => {
        this.setState({ loading: true });
        axios.get("http://localhost:8080/tile/" + Id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        tileCode: response.data.tileCode,
                        size: response.data.size,
                        price: response.data.price,
                        imgLink: response.data.imgLink,
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
            tileCode: this.state.tileCode,
            size: this.state.size,
            price: this.state.price,
            imgLink: this.state.imgLink,
            create_At: this.state.create_At,
            update_At: this.state.update_At,
        };

        this.setState({ loading: true });
        axios.post("http://localhost:8080/tile/add", bm)
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
            tileCode: this.state.tileCode,
            size: this.state.size,
            price: this.state.price,
            imgLink: this.state.imgLink,
            create_At: this.state.create_At,
            update_At: this.state.update_At,

        };


        axios.post("http://localhost:8080/tile/add", bm)
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
        return this.props.history.push("/TileList");
    };

    render() {
        const { id, tileCode, size, price, imgLink } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "Tile Updated Successfully." : "Tile Saved Successfully."} type={"success"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Tile" : "Add New Tile"}
                    </Card.Header>
                    <Form onReset={this.resetBM} onSubmit={this.state.id ? this.updateBM : this.submitBM} id="bmFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridtileCode">
                                    <Form.Label>tileCode   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
                                        type="text" name="tileCode"
                                        value={tileCode} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter tileCode" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridtileimgLink">
                                    <Form.Label>imgLink   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
                                        type="text" name="imgLink"
                                        value={imgLink} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter img Link" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridsize">
                                    <Form.Label>Size By Blocks  {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control as="select" custom
                                        onChange={this.bmChange} name="size" value={size} className={"bg-dark text-white"}
                                    >
                                        <option value="" >later give</option>
                                        <option value="2" >2 X 2</option>
                                        <option value="4" >4 X 4</option>

                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridprice">
                                    <Form.Label>price   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
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
                                <FontAwesomeIcon icon={faList} /> Tile List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}