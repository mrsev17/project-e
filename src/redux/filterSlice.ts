import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FilterState {
    title: string;
    dependencies: (string | number)[];
}

const initialState: FilterState = {
    title: '',
    dependencies: [],
};

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDependencies(state, action: PayloadAction<string | number>) {
            if (state.dependencies.includes(action.payload)) {
                state.dependencies = state.dependencies.filter((dep) => dep !== action.payload);
            } else {
                state.dependencies.push(action.payload);
            }
            return state;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectDependncies = (state: RootState) => state.filter.dependencies;

export const { setTitleFilter, setDependencies, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
