import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    title: string;
    filterByPrice: {
        from: number | null;
        to: number | null;
    };
    sortByHighLow: null | 'toLow' | 'toHigh';
    dependencies: {
        [key: string]: (number | string)[];
    };
    notTrackedDataFilters: string[];
}

const initialState: FilterState = {
    title: '',
    filterByPrice: {
        from: null,
        to: null,
    },
    sortByHighLow: null,
    dependencies: {},
    notTrackedDataFilters: ['productName', 'category', 'price', 'inStock', 'isFavorite', 'photos', 'description', 'id'],
};

interface SetFilterByPricePayload {
    from: number;
    to: number;
}

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
        setFilterByPrice(state, action: PayloadAction<SetFilterByPricePayload>) {
            const priceFrom: number = action.payload.from;
            const priceTo: number = action.payload.to;
            return { ...state, filterByPrice: { from: priceFrom, to: priceTo } };
        },
        //
        setSortByHighLow(state, action: PayloadAction<'toLow' | 'toHigh'>) {
            return { ...state, sortByHighLow: action.payload };
        },
        //
        setDependencies(state, action: PayloadAction<setDependenciesParameters>) {
            const category: string = action.payload.category;
            const value: string | number = action.payload.option;
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

export const { setTitleFilter, setFilterByPrice, setSortByHighLow, setDependencies, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
