import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../redux';
import { toggleViewMode } from '../redux/fieldsSlice';
import { Box, FormGroup, FormControlLabel, Switch } from '@mui/material';

const Toggle: React.FC = () => {
    const dispatch = useDispatch();
    const viewMode = useSelector((state: RootState) => state.fields.viewMode);

    const handleToggleViewMode = () => {
        dispatch(toggleViewMode());
    };

    return (
        <Box sx={{ flex: 1 }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={viewMode === 'growth'}
                            onChange={handleToggleViewMode}
                            aria-label="view mode switch"
                        />
                    }
                    label={viewMode === 'growth' ? 'Growth Data' : 'Soil Analysis'}
                />
            </FormGroup>
        </Box>
    );
};

export default Toggle;
