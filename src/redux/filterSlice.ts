import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    title: string;
    filterByPrice: string;
    dependencies: {
        [key: string]: (number | string)[];
    };
    notTrackedDataFilters: string[];
}

const initialState: FilterState = {
    title: '',
    filterByPrice: '',
    dependencies: {},
    notTrackedDataFilters: ['productName', 'category', 'price', 'inStock', 'isFavorite', 'photos', 'description', 'id'],
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
            const category = action.payload.category;
            const value = action.payload.option;

            if (!state.dependencies.hasOwnProperty(category)) {
                state.dependencies[category] = [];
                state.dependencies[category].push(value);
            } else if (state.dependencies.hasOwnProperty(category)) {
                if (!state.dependencies[category].includes(value)) {
                    state.dependencies[category].push(value);
                } else if (state.dependencies[category].includes(value)) {
                    state.dependencies[category] = state.dependencies[category].filter((item) => {
                        return item !== value;
                    });
                }
            }
            if (!state.dependencies[category].length) {
                delete state.dependencies[category];
            }
            return state;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const { setTitleFilter, setDependencies, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
