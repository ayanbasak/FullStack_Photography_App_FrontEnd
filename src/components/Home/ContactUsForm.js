import React, { Component } from 'react'
import "./ContactUsForm.css";

import { Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../admin/MyToast';
import axios from 'axios';


export class ContactUsForm extends Component {
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
        id: '', name: '', email: '', contactNo: '', message: ''
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

    bmChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const { name, email, contactNo, message } = this.state;
        return (
            <>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message="Your Query Saved Successfully in Our Server." type={"success"} />
                </div>
                <div className="background">
                    <div className="container">
                        <div className="screen">
                            <div className="screen-body">
                                <div className="screen-body-item left">
                                    <div className="app-title">
                                        <span>CONTACT</span>
                                        <span>US</span>
                                        {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}
                                    </div>
                                </div>
                                <Form onReset={this.resetBM} onSubmit={this.submitBM} id="bmFormId">
                                    <div className="screen-body-item">
                                        <div className="app-form">
                                            <div className="app-form-group">
                                                <input className="app-form-control" placeholder="NAME" type="text" name="name" value={name} onChange={this.bmChange} />
                                            </div>
                                            <div className="app-form-group">
                                                <input className="app-form-control" placeholder="EMAIL" type="text" name="email" value={email} onChange={this.bmChange} />
                                            </div>
                                            <div className="app-form-group">
                                                <input className="app-form-control" placeholder="CONTACT NO" type="text" name="contactNo" value={contactNo} onChange={this.bmChange} />
                                            </div>
                                            <div className="app-form-group message">
                                                <input className="app-form-control" placeholder="MESSAGE" type="text" name="message" value={message} onChange={this.bmChange} />
                                            </div>
                                            <div className="app-form-group buttons">
                                                <button className="app-form-button" type="reset">CANCEL</button>
                                                <button className="app-form-button" type="submit">SEND</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ContactUsForm;
