import React, { useEffect, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(props.data);
        console.log(props.data);
        setIsLoading(false);
    }, [props.data]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Label</TableCell>
                        <TableCell align='center'>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading && (
                        <>
                            {tableData.map((row) => (
                                <TableRow key={row[0]}>
                                    <TableCell align='center'>{row[0]}</TableCell>
                                    <TableCell align='center'>{row[1]}</TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}