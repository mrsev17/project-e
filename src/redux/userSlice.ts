import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInitialState {
    token?: string;
    email: string;
    id: string;
}

interface SetUser {
    token?: string;
    email: string;
    id: string;
}

const initialState: UserInitialState = {
    token: '',
    email: '',
    id: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<SetUser>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = '';
            state.token = '';
            state.id = '';
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
