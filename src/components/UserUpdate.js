import React, { Component } from 'react';
import { Card, Form, Button, Col, Table, Row } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './admin/MyToast';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show: false,
            showToast: false,
            showPfield: false
        };
    }
    initialState = {
        id: '', username: '', contactNo: '', fullName: '', password: '', confirmPassword: '', create_At: '', update_At: ''
    };

    changeUpdate = () => {
        this.setState({ show: !this.state.show });
    }
    componentDidMount() {
        this.findBMById();
    }

    findBMById = () => {
        axios.get("http://localhost:8080/api/users/me")
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
    changepField = () => {
        this.setState({ showPfield: !this.state.showPfield });
    }

    resetBM = () => {
        this.setState(() => this.initialState);
    };
    updateBM = event => {
        event.preventDefault();

        const bm = {
            id: this.state.id,
            username: this.state.username,
            fullName: this.state.fullName,
            contactNo: this.state.contactNo,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            create_At: this.state.create_At,
            update_At: this.state.update_At,

        };
        axios.post("http://localhost:8080/api/users/add/me", bm)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "showToast": true, "method": "put" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                } else {
                    this.setState({ "showToast": false });
                }
            });

        this.setState(this.initialState);
    };

    bmChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const { username, fullName, password, confirmPassword, contactNo } = this.state;
        return (
            <div>
                <div style={{ "display": this.state.showToast ? "block" : "none" }}>
                    <MyToast show={this.state.showToast} message="Your Details Updated Successfully." type={"success"} />
                </div>
                <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Form onReset={this.resetBM} onSubmit={this.updateBM} style={{ backgroundColor: 'white' }}>
                        <Table striped bordered hover style={{ width: 800, textAlign: 'center', alignItems: 'center' }}>
                            <thead>
                                <tr style={{ width: 800 }}>
                                    <th><h4>Your Details</h4></th>
                                    {this.state.show ? (
                                        <th><h4>Update Your Details</h4></th>) : null}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><h5>Name:</h5><h5>{fullName ? fullName : "Loading..."}</h5></td>
                                    {this.state.show ? (
                                        <td>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" name="fullName" value={fullName} onChange={this.bmChange} />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                        </td>
                                    ) : null}
                                </tr>
                                <tr>
                                    <td><h5>Email address: </h5> <h5>{username ? username : "Loading..."}</h5></td>
                                    {this.state.show ? (
                                        <td>
                                            <Form.Group controlId="username">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name="username" value={username} onChange={this.bmChange} />
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                            </Form.Text>
                                            </Form.Group>
                                        </td>
                                    ) : null}
                                </tr>
                                <tr>
                                    <td><h5>Contact Number: </h5> <h5>{contactNo ? contactNo : "Loading..."}</h5></td>
                                    {this.state.show ? (
                                        <td>
                                            <Form.Group controlId="contactNo">
                                                <Form.Label>Contact Number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Contact Number" name="contactNo" value={contactNo} onChange={this.bmChange} />
                                                <Form.Text className="text-muted">
                                                    We'll never share your Contact Number with anyone else.
                                            </Form.Text>
                                            </Form.Group>
                                        </td>
                                    ) : null}
                                </tr>


                                {this.state.show ? (
                                    <tr>
                                        {this.state.showPfield ? (
                                            <>
                                                <td></td>
                                                <td>
                                                    <Col>
                                                        <Form.Group controlId="confirmPassword">
                                                            <Form.Label>Old Password</Form.Label>

                                                            <Form.Control type="text" placeholder="Old Password" name="confirmPassword" value={confirmPassword} onChange={this.bmChange} />
                                                            <Form.Text className="text-muted">
                                                                We'll never share your Password with anyone else.
                                                            </Form.Text>
                                                        </Form.Group>

                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="password">
                                                            <Form.Label>New Password</Form.Label>
                                                            <Form.Control type="password" placeholder="New Password" name="password" value={password} onChange={this.bmChange} />
                                                            <Form.Text className="text-muted">
                                                                We'll never share your Password with anyone else.
                                                    </Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Button variant="outline-danger" size="sm" onClick={this.changepField} style={{ display: 'flex', justifyContent: 'space-between' }} >
                                                        X
                                                    </Button>
                                                </td>
                                            </>
                                        ) : (
                                                <td></td>
                                            )}
                                    </tr>
                                ) : null}

                                {(this.state.show) ? (
                                    <tr>
                                        <td>
                                            {this.state.showPfield ? null : (
                                                <Button variant="outline-primary" size="lg" onClick={this.changepField} >
                                                    Change Password
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <Button variant="outline-success" size="lg" type="submit" >Update My Details</Button>
                                            <Button size="lg" variant="info" type="reset">
                                                <FontAwesomeIcon icon={faUndo} /> Reset
                                            </Button>
                                            <Button variant="outline-danger" size="lg" onClick={this.changeUpdate} >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </Button>
                                        </td>
                                    </tr>
                                ) : null}
                                {this.state.show ? null :
                                    <tr>
                                        <td colSpan="2">
                                            <Button variant="outline-primary" size="lg" onClick={this.changeUpdate} >
                                                Update My Details
                                                </Button>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Form>
                </Row>

            </div>
        )
    }
}
