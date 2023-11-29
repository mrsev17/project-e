import { createSlice } from '@reduxjs/toolkit';
import { darkBodyBackGround, lightBodyBackGround } from '../utils/colorsCSS';
import { RootState } from './store';

interface modeState {
    mode: boolean;
    ligthModeBG: string;
    darkModeBG: string;
}

const initialState: modeState = {
    mode: true,
    ligthModeBG: lightBodyBackGround,
    darkModeBG: darkBodyBackGround,
};

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode(state) {
            return { ...state, mode: !state.mode };
        },
    },
});

export const selectMode = (state: RootState) => state.mode.mode;

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
