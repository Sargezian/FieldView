import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFields } from '../api/fieldsApi';
import { setFields, updateFieldName, selectField } from '../redux/fieldsSlice';
import { RootState, AppDispatch } from '../redux';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)<{ selected: boolean }>(({ theme, selected }) => ({
    backgroundColor: selected ? theme.palette.primary.light : 'inherit',
    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.light : theme.palette.action.hover,
    },
}));

const FieldsList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const fields = useSelector((state: RootState) => state.fields.fields);
    const selectedFieldId = useSelector((state: RootState) => state.fields.selectedFieldId);
    const [editFieldId, setEditFieldId] = useState<string | null>(null);
    const [newFieldName, setNewFieldName] = useState('');

    useEffect(() => {
        fetchFields().then((data) => {
            dispatch(setFields(data));
        });
    }, [dispatch]);

    const handleEditClick = (field: { id: string; name: string }) => {
        setEditFieldId(field.id);
        setNewFieldName(field.name);
    };

    const handleUpdateClick = () => {
        if (editFieldId) {
            dispatch(updateFieldName({ id: editFieldId, newName: newFieldName }));
            setEditFieldId(null);
            setNewFieldName('');
        }
    };

    const handleFieldClick = (fieldId: string) => {
        dispatch(selectField(fieldId));
    };

    return (
        <Box sx={{ flex: 1 }}>
            <TableContainer component={Paper}>
                <Typography variant="h4" gutterBottom align="center">
                    Fields List
                </Typography>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Field Name</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.length > 0 ? (
                            fields.map((field) => (
                                <StyledTableRow
                                    key={field.id}
                                    selected={field.id === selectedFieldId}
                                    onClick={() => handleFieldClick(field.id)}
                                    hover
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {editFieldId === field.id ? (
                                            <TextField
                                                value={newFieldName}
                                                onChange={(e) => setNewFieldName(e.target.value)}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                            />
                                        ) : (
                                            field.name
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {editFieldId === field.id ? (
                                            <Button variant="contained" onClick={handleUpdateClick}>
                                                Update
                                            </Button>
                                        ) : (
                                            <Button variant="outlined" onClick={() => handleEditClick(field)}>
                                                Edit
                                            </Button>
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={2} align="center">
                                    No fields data available.
                                </StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FieldsList;
