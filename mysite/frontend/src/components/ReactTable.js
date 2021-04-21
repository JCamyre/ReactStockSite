import { useTable } from 'react-table';

function ReactTable(columns, tableData, tableInstance) {
    // How to change amount of cols based on number of unique keys 

    if (json_data !== null) {



        const tempInstance = useTable({ 
            columns, 
            data: tableData // Have to do data: tableData, can't just have plain tableData
        });
    
        setTableInstance();
    
        const { // I think this is like a, b, c = list.split(), but with methods
            getTableProps, // How to make this a React Hook?
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = tableInstance 

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
                        rows.map(row => {
                            prepareRow(row)
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
        )
    }
}

export default ReactTable