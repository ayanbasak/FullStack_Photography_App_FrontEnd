import React, { Component } from 'react';

import { connect } from 'react-redux';
import "../admin/Style.css";
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MyToast from '../admin/MyToast';
import axios from 'axios';
import Products from './Products';

class LoadProduces extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            search: '',
            currentPage: 1,
            tilesPerPage: 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({ sortDir: "desc" }) : this.setState({ sortDir: "asc" });
            this.findAllTiles(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllTiles(this.state.currentPage);
    }

    findAllTiles(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8080/tile/get?pageNumber=" + currentPage + "&pageSize=" + this.state.tilesPerPage + "&sortBy=price&sortDir=" + this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    tiles: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    deleteTile = (tileId) => {
        fetch("http://localhost:8080/tile/" + tileId, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then((tile) => {
                if (tile) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        tiles: this.state.tiles.filter(tile => tile.id !== tileId)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllTiles(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllTiles(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllTiles(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.tilesPerPage);
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllTiles(condition);
            }
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.tilesPerPage)) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllTiles(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({ "search": '' });
        this.findAllTiles(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8080/tile/search/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.tilesPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    tiles: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const { tiles, currentPage, totalPages, search } = this.state;
        //console.log("pagi t" + tiles.map((t) => console.log(t)));

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Tile Deleted Successfully."} type={"danger"} />
                </div>
                <Card className={"border border-primary bg-primary text-dark"}>
                    <Card.Header>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"border border-dark bg-info text-dark"}
                                    onChange={this.searchChange} />
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-dark" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Products ti={tiles} />
                    </Card.Body>
                    {tiles.length > 0 ?
                        <Card.Footer>
                            <div style={{ "float": "left" }}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{ "float": "right" }}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-dark bg-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-dark bg-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num border border-dark  bg-info"} name="currentPage" value={currentPage} type="number"
                                        onChange={this.changePage} />
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-dark bg-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-dark bg-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                    }
                </Card>
            </div>
        );
    }
}
/*
const mapStateToProps = state => {
    return {
        tileObject: state.tile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTile: (tileId) => dispatch(deleteTile(tileId))
    };
};
*/
export default LoadProduces;