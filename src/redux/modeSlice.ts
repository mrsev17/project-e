import { createSlice } from '@reduxjs/toolkit';

interface modeState {
    modeState: boolean;
}

const initialState: modeState = {
    modeState: true,
};

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode(state) {
            return { ...state, modeState: !state.modeState };
        },
    },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
