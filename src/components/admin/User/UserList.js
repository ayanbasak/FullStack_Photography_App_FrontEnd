import React, { Component } from 'react';

import '../Style.css';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bms: []
        };
    }

    componentDidMount() {
        this.findAllBMs();
    }

    findAllBMs() {

        axios.get("http://localhost:8080/api/users/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    bms: data,
                });
            });
    };

    deleteBM = (Id) => {
        /* axios.delete("http://localhost:8080/api/users/" + Id) */
        axios.delete("http://localhost:8080/api/users/" + Id)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        bms: this.state.bms.filter(bm => bm.id !== Id)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    };


    render() {
        const { bms } = this.state;

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"User Deleted Successfully."} type={"danger"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{ "float": "left" }}>
                            <h3> <FontAwesomeIcon icon={faList} /> User List</h3>
                        </div>
                        <Link to={`/addUser`}>
                            <div style={{ "float": "right", "backgroundColor": "black", "padding": "10px", "margin": "4px" }}>
                                <FontAwesomeIcon icon={faPlus} /> Add User
                            </div>
                        </Link>{'  '}
                        <Link to={`/register`}>
                            <div style={{ "float": "right", "backgroundColor": "black", "padding": "10px", "margin": "4px" }}>
                                <FontAwesomeIcon icon={faPlus} /> Register User
                            </div>
                        </Link>

                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>username</th>
                                    <th>fullName</th>
                                    <th>contactNo</th>
                                    <th>password</th>
                                    <th>create_At</th>
                                    <th>update_At</th>
                                    <th className={"bg-danger text-center text-white"} >Update / Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bms.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="7">No Users Available.</td>
                                        </tr> :
                                        bms.map((bm) => (
                                            <tr key={bm.id}>

                                                <td>{bm.id}</td>
                                                <td>{bm.username}</td>
                                                <td>{bm.fullName}</td>
                                                <td>{bm.contactNo}</td>
                                                <td>{bm.password}</td>
                                                <td>{bm.create_At}</td>
                                                <td>{bm.update_At}</td>

                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"editUser/" + bm.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
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