import React from 'react';
import { useTable } from 'react-table';

// Can I make so everytime I reference Table component, I can pass in data. Right now I can only have data for one table. 
export default function Table({ columns, data }) {
    // How to change amount of cols based on number of unique keys 

     const { // I think this is like a, b, c = list.split(), but with methods
        getTableProps, // How to make this a React Hook?
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    });
    
    // data has to be in [{}] form. Just a dictionary is not good enough. Has to be list(dict()). 
    

    return (
        <table {...getTableProps()}>
            <thead>
                    {
                    // loop through headerGroups, for each headerGroup, map the columns and render the 'Header' label for each column
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        { column.render('Header') }
                                    </th>
                            ))}
                        </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    );
}


