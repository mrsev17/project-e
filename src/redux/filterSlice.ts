import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FilterState {
    companies: (string | number)[];
    title: string;
    dependencies: (string | number)[];
}

const initialState: FilterState = {
    companies: [],
    title: '',
    dependencies: [],
};

interface setDependenciesParameters {
    option: string | number;
    category: string;
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDependencies(state, action: PayloadAction<setDependenciesParameters>) {
            if (action.payload.category === 'company') {
                const checkExistOrNot = state.companies.includes(action.payload.option);

                if (checkExistOrNot) {
                    state.companies = state.companies.filter((company) => company !== action.payload.option);
                } else {
                    state.companies.push(action.payload.option);
                }

                // console.log(state.companies);
            }
            if (state.dependencies.includes(action.payload.option)) {
                state.dependencies = state.dependencies.filter((dep) => dep !== action.payload.option);
            } else {
                state.dependencies.push(action.payload.option);
            }
            return state;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const selectCompanies = (state: RootState) => state.filter.companies;
export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectDependncies = (state: RootState) => state.filter.dependencies;

export const { setTitleFilter, setDependencies, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
