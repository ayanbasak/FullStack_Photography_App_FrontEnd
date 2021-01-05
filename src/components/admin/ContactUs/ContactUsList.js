import React, { Component } from 'react';

import '../Style.css';
import { Card, Table, ButtonGroup, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class ContactUsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bms: [],
            loading: false
        };
    }

    componentDidMount() {
        this.findAllBMs();
    }

    findAllBMs() {
        this.setState({ loading: true });
        axios.get("http://localhost:8080/contactus/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    bms: data,
                });
                this.setState({ loading: false });
            });
    };

    deleteBM = (Id) => {
        this.setState({ loading: true });
        axios.delete("http://localhost:8080/contactus/" + Id)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        bms: this.state.bms.filter(bm => bm.id !== Id)
                    });
                } else {
                    this.setState({ "show": false });
                    this.setState({ loading: false });
                }
            });
    };


    render() {
        const { bms } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"ContactUs Deleted Successfully."} type={"danger"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{ "float": "left" }}>
                            <h3> <FontAwesomeIcon icon={faList} /> ContactUs List  {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</h3>
                        </div>
                        <Link to={`/addContactUs`}>
                            <div style={{ "float": "right", "backgroundColor": "black", "padding": "10px" }}>
                                <FontAwesomeIcon icon={faPlus} /> Add ContactUs
                            </div>
                        </Link>

                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>email</th>
                                    <th>contactNo</th>
                                    <th>message</th>
                                    <th>create_At</th>
                                    <th className={"bg-danger text-center text-white"} >Update / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bms.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="8">No ContactUs Available.</td>
                                        </tr> :
                                        bms.map((bm) => (
                                            <tr key={bm.id}>

                                                <td>{bm.id}</td>
                                                <td>{bm.name}</td>
                                                <td>{bm.email}</td>
                                                <td>{bm.contactNo}</td>
                                                <td>{bm.message}</td>
                                                <td>{bm.create_At}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"editContactUs/" + bm.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteBM.bind(this, bm.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>

                </Card>
            </div>
        );
    }
}