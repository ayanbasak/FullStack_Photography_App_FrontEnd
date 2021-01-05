import React from "react";
import PropTypes from "prop-types";
import { useAddItem, useDecreaseItem, useRemoveItem } from "../store";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

const CartButtons = ({ item }) => {
    const add = useAddItem();
    const remove = useRemoveItem();
    const decrease = useDecreaseItem();
    return (
        <div className="ui buttons mini">
            <Button
                variant="contained"
                color="secondary"
                className={""}
                startIcon={<RemoveIcon />}
                onClick={() => decrease(item)}
            ><Typography variant="p" gutterBottom>Decrease</Typography></Button>
            <Button
                variant="contained"
                color="primary"
                className={""}
                startIcon={<AddIcon />}
                onClick={() => add(item)}
            ><Typography variant="p" gutterBottom>Add</Typography></Button>
            <Button
                variant="contained"
                color="secondary"
                className={""}
                startIcon={<DeleteIcon />}
                onClick={() => remove(item)}
            ><Typography variant="p" gutterBottom>Delete</Typography></Button>
        </div>
    );
};

CartButtons.propTypes = {
    item: PropTypes.object,
};

export default CartButtons;