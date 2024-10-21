import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoilAnalysisData {
    coordinates: [number, number];
    phValue: number;
}

interface GrowthData {
    coordinates: [number, number];
    NDVI: number;
}

interface Field {
    id: string;
    name: string;
    polygon: Array<[number, number]>;
    growthData?: GrowthData[];
    soilAnalysisData?: SoilAnalysisData[];
}

interface FieldsState {
    fields: Field[];
    selectedFieldId: string | null;
    viewMode: 'growth' | 'soil';
}

const initialState: FieldsState = {
    fields: [],
    selectedFieldId: null,
    viewMode: 'growth',
};

const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        setFields: (state, action: PayloadAction<Field[]>) => {
            state.fields = action.payload;
        },
        updateFieldName: (state, action: PayloadAction<{ id: string; newName: string }>) => {
            const { id, newName } = action.payload;
            const field = state.fields.find((f) => f.id === id);
            if (field) {
                field.name = newName;
            }
        },
        selectField: (state, action: PayloadAction<string | null>) => {
            state.selectedFieldId = action.payload;
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === 'growth' ? 'soil' : 'growth';
        },
    },
});

export const { setFields, updateFieldName, selectField, toggleViewMode} = fieldsSlice.actions;
export default fieldsSlice.reducer;
