import React, { Component } from 'react';

import { Card, Form, Button, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';

export default class ContactUs extends Component {

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
        id: '', name: '', email: '', contactNo: '', message: '', create_At: ''
    };

    componentDidMount() {
        const Id = +this.props.match.params.id;
        if (Id) {
            this.findBMById(Id);
        }
    }

    findBMById = (Id) => {
        this.setState({ loading: true });
        axios.get("http://localhost:8080/contactus/" + Id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        contactNo: response.data.contactNo,
                        message: response.data.message,
                        create_At: response.data.create_At,
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
            name: this.state.name,
            email: this.state.email,
            contactNo: this.state.contactNo,
            message: this.state.message,
            create_At: this.state.create_At,
        };

        this.setState({ loading: true });
        axios.post("http://localhost:8080/contactus/add", bm)
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
            name: this.state.name,
            email: this.state.email,
            contactNo: this.state.contactNo,
            message: this.state.message,
            create_At: this.state.create_At,
        };

        axios.post("http://localhost:8080/contactus/add", bm)
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
        return this.props.history.push("/ContactUsList");
    };

    render() {
        const { name, email, contactNo, message } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "ContactUs Updated Successfully." : "ContactUs Saved Successfully."} type={"success"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update ContactUs" : "Add New ContactUs"}
                    </Card.Header>
                    <Form onReset={this.resetBM} onSubmit={this.state.id ? this.updateBM : this.submitBM} id="bmFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridname">
                                    <Form.Label>name   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
                                        type="text" name="name"
                                        value={name} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridemail">
                                    <Form.Label>Email   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
                                        type="text" name="email"
                                        value={email} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Email" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridcontactNo">
                                    <Form.Label>Contact No.   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
                                        type="text" name="contactNo"
                                        value={contactNo} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Contact No." />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridmessage">
                                    <Form.Label>Message   {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</Form.Label>
                                    <Form.Control
                                        type="text" name="message"
                                        value={message} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Message" />
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
                                <FontAwesomeIcon icon={faList} /> ContactUs List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}