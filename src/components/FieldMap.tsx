import React from 'react';
import {GoogleMap, LoadScript, Polygon, Marker} from '@react-google-maps/api';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux';
import {selectField} from '../redux/fieldsSlice';
import {Box, Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";

const containerStyle = {
    width: '100%',
    height: '461px',
};

const center = {
    lat: 56.1625,
    lng: 10.2039,
};

const FieldMap: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const fields = useSelector((state: RootState) => state.fields.fields);
    const selectedFieldId = useSelector((state: RootState) => state.fields.selectedFieldId);
    const viewMode = useSelector((state: RootState) => state.fields.viewMode);

    const getColorByNDVI = (ndvi: number): string => {
        if (ndvi < 0.2) return 'red';
        if (ndvi >= 0.2 && ndvi <= 0.5) return 'orange';
        return 'green';
    };

    const getColorByPH = (phValue: number): string => {
        if (phValue < 5.5) return 'red';
        if (phValue >= 5.5 && phValue <= 6.5) return 'orange';
        if (phValue > 6.5 && phValue <= 7.5) return 'yellow';
        return 'green';
    };


    return (
        <Box sx={{flex: 1}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <LoadScript googleMapsApiKey="AIzaSyDaLg9PjuxPv2FGhNOisKI61DLJINioXN0">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                            {fields.map((field) => (
                                <Polygon
                                    key={field.id}
                                    paths={field.polygon.map(([lat, lng]) => ({lat, lng}))}
                                    options={{
                                        fillColor: selectedFieldId === field.id ? 'red' : 'blue',
                                        fillOpacity: 0.4,
                                        strokeColor: selectedFieldId === field.id ? 'red' : 'blue',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                    }}
                                    onClick={() => dispatch(selectField(field.id))}
                                />
                            ))}

                            {viewMode === 'growth'
                                ? fields.map((field) =>
                                    field.growthData?.map((data) => (
                                        <Marker
                                            key={`${field.id}-${data.coordinates[0]}-${data.coordinates[1]}`}
                                            position={{lat: data.coordinates[0], lng: data.coordinates[1]}}
                                            icon={{
                                                path: window.google.maps.SymbolPath.CIRCLE,
                                                fillColor: getColorByNDVI(data.NDVI),
                                                fillOpacity: 1,
                                                strokeWeight: 1,
                                                strokeColor: 'black',
                                                scale: 6,
                                            }}
                                        />
                                    ))
                                )
                                : fields.map((field) =>
                                    field.soilAnalysisData?.map((data) => (
                                        <Marker
                                            key={`${field.id}-${data.coordinates[0]}-${data.coordinates[1]}`}
                                            position={{lat: data.coordinates[0], lng: data.coordinates[1]}}
                                            icon={{
                                                path: window.google.maps.SymbolPath.CIRCLE,
                                                fillColor: getColorByPH(data.phValue),
                                                fillOpacity: 1,
                                                strokeWeight: 1,
                                                strokeColor: 'black',
                                                scale: 6,
                                            }}
                                        />
                                    ))
                                )}
                        </GoogleMap>
                    </LoadScript>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FieldMap;
