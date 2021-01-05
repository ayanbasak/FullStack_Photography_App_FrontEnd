import React, { useState, useCallback, useEffect, useRef } from "react";
import Gallery from "react-photo-gallery";
import { Modal, ModalGateway } from "react-images";
import SingleProductView from "./SingleProductView";
import axios from 'axios';

const Products = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [tiles, setTiles] = useState([]);
    //var tileList = [];

    useEffect(() => {
        var tileli = props.ti.map((t) => {
            var tile = {
                id: t.id,
                src: t.imgLink,
                tileCode: t.tileCode,
                height: t.size,
                width: t.size,
                price: t.price,
            }
            //tileList = [...tileList, tile];
            return tile;
        });
        setTiles(tileli);
        //console.log("tileli:   ", tileli);
    }, [props.ti])

    /*
        useEffect(() => {
            fetchTiles();
        }, []);
        //console.log(tiles);
    
        async function fetchTiles() {
            var tileList = [];
            var resp = await axios.get("http://localhost:8080/tile/all")
                .then(response => response.data)
                .then((data) => {
                    data.map((d) => {
                        // console.log("d   ", d);
                        var tile = {
                            id: d.id,
                            src: d.imgLink,
                            tileCode: d.tileCode,
                            height: d.size,
                            width: d.size,
                            price: d.price,
                        }
                        // console.log("tile    ", tile);
                        tileList = [...tileList, tile];
                    })
                    return tileList;
                });
            setTiles(resp);
        }
    */
    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div>
            <Gallery photos={tiles} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <SingleProductView tile={tiles[currentImage]} closeLightbox={closeLightbox} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default Products;

