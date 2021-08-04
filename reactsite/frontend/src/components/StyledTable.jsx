import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function InfoTable(props){
    const classes = useStyles();
    const table_data = props.data;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Label
                        </TableCell>
                        <TableCell>
                            Value
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table_data.map((row) => (
                        <TableRow>
                            <TableCell>
                                {row[0]}
                            </TableCell>
                            <TableCell>
                                {row[1]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}