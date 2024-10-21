import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import { store } from './redux';
import FieldsList from "./components/FieldsList";
import FieldMap from "./components/FieldMap";
import FieldDataView from "./components/FieldDataView";
import Toggle from "./components/Toggle";
import {Stack} from "@mui/material";

function App() {
    return (
        <Provider store={store}>
            <div>
                <Stack direction="row" spacing={2} marginTop={"20px"}>
                    <FieldsList />
                    <FieldMap />
                </Stack>
                <Stack direction="row" spacing={2} marginTop={"20px"}>
                    <FieldDataView />
                    <Toggle />
                </Stack>
            </div>
        </Provider>
    );
}

export default App;
