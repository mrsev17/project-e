import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FilterState {
    title: string;
}

const initialState: FilterState = {
    title: '',
};

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const selectTitleFilter = (state: RootState) => state.filter.title;

export const { setTitleFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
