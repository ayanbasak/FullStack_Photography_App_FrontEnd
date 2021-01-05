import React, { Component } from 'react';

import '../Style.css';
import { Card, Table, ButtonGroup, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class OrderedItemsList extends Component {

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
        axios.get("http://localhost:8080/ordered/all")
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
        axios.delete("http://localhost:8080/ordered/" + Id)
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
                    <MyToast show={this.state.show} message={"OrderedItems Deleted Successfully."} type={"danger"} />
                </div>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{ "float": "left" }}>
                            <h3> <FontAwesomeIcon icon={faList} /> OrderedItems List {this.state.loading ? < Spinner animation="grow" variant="light" /> : null}</h3>

                        </div>
                        <Link to={`/addOrderedItems`}>
                            <div style={{ "float": "right", "backgroundColor": "black", "padding": "10px" }}>
                                <FontAwesomeIcon icon={faPlus} /> Add OrderedItems
                            </div>
                        </Link>

                    </Card.Header>

                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>userFullname</th>
                                    <th>userEmail</th>
                                    <th>totalQty</th>
                                    <th>totalPrice</th>
                                    <th>status</th>
                                    <th>create_At</th>
                                    <th>update_At</th>
                                    <th className={"bg-danger text-center text-white"} >Update / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bms.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="9">No OrderedItems Available.</td>
                                        </tr> :
                                        bms.map((bm) => (
                                            <tr key={bm.id}>

                                                <td>{bm.id}</td>
                                                <td>{bm.userFullname}</td>
                                                <td>{bm.userEmail}</td>
                                                <td>{bm.totalQty}</td>
                                                <td>{bm.totalPrice}</td>
                                                <td>{bm.status}</td>
                                                <td>{bm.create_At}</td>
                                                <td>{bm.update_At}</td>


                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"editOrderedItems/" + bm.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
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