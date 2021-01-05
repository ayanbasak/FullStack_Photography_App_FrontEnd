import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show: false
        };
        this.bmChange = this.bmChange.bind(this);
        this.submitBM = this.submitBM.bind(this);
    }

    initialState = {
        id: '', username: '', fullName: '', contactNo: '', password: '', create_At: '', update_At: ''
    };

    componentDidMount() {
        const Id = +this.props.match.params.id;

        if (Id) {
            this.findBMById(Id);
        }
    }

    findBMById = (Id) => {
        axios.get("http://localhost:8080/api/users/" + Id)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        username: response.data.username,
                        fullName: response.data.fullName,
                        contactNo: response.data.contactNo,
                        password: response.data.password,
                        create_At: response.data.create_At,
                        update_At: response.data.update_At,

                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });
    };

    resetBM = () => {
        this.setState(() => this.initialState);
    };



    submitBM = event => {
        event.preventDefault();

        const bm = {
            username: this.state.username,
            fullName: this.state.fullName,
            contactNo: this.state.contactNo,
            password: this.state.password,
            create_At: this.state.create_At,
            update_At: this.state.update_At,
        };


        axios.post("http://localhost:8080/api/users/add", bm)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true, "method": "post" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                } else {
                    this.setState({ "show": false });
                }
            });

        this.setState(this.initialState);
    };


    updateBM = event => {
        event.preventDefault();

        const bm = {
            id: this.state.id,
            username: this.state.username,
            fullName: this.state.fullName,
            contactNo: this.state.contactNo,
            password: this.state.password,
            create_At: this.state.create_At,
            update_At: this.state.update_At,

        };


        axios.post("http://localhost:8080/api/users/add", bm)
            .then(response => {
                if (response.data != null) {
                    console.log(response.data, "--response.data");
                    this.setState({ "show": true, "method": "put" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    setTimeout(() => this.bmList(), 3000);
                } else {
                    this.setState({ "show": false });
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
        return this.props.history.push("/listUser");
    };

    render() {
        const { username, fullName, password, contactNo } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "User Updated Successfully." : "User Saved Successfully."} type={"success"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update User" : "Add New User"}

                        <Link to={`/register`}>
                            <div style={{ "float": "right", "backgroundColor": "black", "padding": "10px", "margin": "4px" }}>
                                <FontAwesomeIcon icon={faPlus} /> Register User
                            </div>
                        </Link>

                    </Card.Header>
                    <Form onReset={this.resetBM} onSubmit={this.state.id ? this.updateBM : this.submitBM} id="bmFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridusername">
                                    <Form.Label>username</Form.Label>
                                    <Form.Control required
                                        type="text" name="username"
                                        value={username} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Username" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridfullName">
                                    <Form.Label>fullName</Form.Label>
                                    <Form.Control required
                                        type="text" name="fullName"
                                        value={fullName} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter fullName" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridcontactNo">
                                        <Form.Label>contactNo</Form.Label>
                                        <Form.Control required
                                            type="text" name="contactNo"
                                            value={contactNo} onChange={this.bmChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Contact No" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group as={Col} controlId="formGridpassword">
                                    <Form.Label>password(please don't modify password)</Form.Label>
                                    <Form.Control required
                                        type="text" name="password"
                                        value={password} onChange={this.bmChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter password" />
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
                                <FontAwesomeIcon icon={faList} /> User List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div >
        );
    }
}