import React from 'react';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { List } from "react-virtualized";

const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
) {
    const { children, role, ...other } = props;
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = 36; // change this

    return (
        <div ref={ref}>
            <div {...other}>
                <List
                    height={250}
                    width={350}
                    rowHeight = {itemSize}
                    overscanCount={5}
                    rowCount={itemCount}
                    rowRenderer={(props) => {
                        return React.cloneElement(children[props.index], {
                            style: props.style
                        });
                    }}
                    role={role}
                />
            </div>
        </div>
    )
});

export default function VirtualizedAutocomplete (data, onSelect) {
    console.log(onSelect);
    return (
        <Autocomplete
            id='virtualized-autocomplete'
            style={{ width:300 }}
            disableListWrap
            ListboxComponent={ListboxComponent}
            options = {data['data']}
            renderInput={(params) => (
                <TextField {...params} variant='outlined' label='Stocks' fullWidth />
            )}
            onSelect = {onSelect}
        />
    )
}

