import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface counterState {
    counter: number;
}

const initialState: counterState = {
    counter: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setCounterPlusOne(state) {
            state.counter = state.counter + 1;
        },
        setCounterMinusOne(state) {
            state.counter = state.counter - 1;
        },
        resetCounter() {
            return initialState;
        },
    },
});

export const selectCounter = (state: RootState) => state.counter;

export const { setCounterPlusOne, setCounterMinusOne, resetCounter } = counterSlice.actions;
export default counterSlice.reducer;
