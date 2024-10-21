import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Typography, Paper, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const FieldDataView: React.FC = () => {
    const selectedFieldId = useSelector((state: RootState) => state.fields.selectedFieldId);
    const fields = useSelector((state: RootState) => state.fields.fields);
    const viewMode = useSelector((state: RootState) => state.fields.viewMode);

    const selectedField = fields.find((field) => field.id === selectedFieldId);

    return (
        <Box sx={{ flex: 1}}>
            {selectedField ? (
                <TableContainer component={Paper}>
                    <Typography variant="h4" gutterBottom align="center">
                        {viewMode === 'growth' ? 'Growth Data' : 'Soil Analysis'}
                    </Typography>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Coordinates</StyledTableCell>
                                {viewMode === 'growth' ? (
                                    <StyledTableCell align={"right"}>NDVI</StyledTableCell>
                                ) : (
                                    <StyledTableCell align={"right"}>pH Value</StyledTableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {viewMode === 'growth'
                                ? selectedField.growthData && selectedField.growthData.length > 0
                                    ? selectedField.growthData.map((data, index) => (
                                        <TableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                ({data.coordinates[0]}, {data.coordinates[1]})
                                            </StyledTableCell>
                                            <StyledTableCell align={"right"}>{data.NDVI}</StyledTableCell>
                                        </TableRow>
                                    ))
                                    : (
                                        <TableRow>
                                            <StyledTableCell colSpan={2} align="center">No growth data available for this field.</StyledTableCell>
                                        </TableRow>
                                    )
                                : selectedField.soilAnalysisData && selectedField.soilAnalysisData.length > 0
                                    ? selectedField.soilAnalysisData.map((data, index) => (
                                        <TableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                ({data.coordinates[0]}, {data.coordinates[1]})
                                            </StyledTableCell>
                                            <StyledTableCell align={"right"}>{data.phValue}</StyledTableCell>
                                        </TableRow>
                                    ))
                                    : (
                                        <TableRow>
                                            <StyledTableCell colSpan={2} align="center">No soil analysis data available for this field</StyledTableCell>
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography align="center">Select a field to view data.</Typography>
            )}
        </Box>
    );
};

export default FieldDataView;
