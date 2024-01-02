import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

interface OrderSlice extends Product {
    quantInOrder: number;
    alreadyInOrder: boolean;
}

interface InitState {
    orderList: OrderSlice[];
}

const initialState: InitState = {
    orderList: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setProductInBasket(state, action: PayloadAction<Product>) {
            const getId = action.payload.id;
            const checkForItem = state.orderList.some((product) => product.id === getId);
            if (!checkForItem) {
                const preBasket = { ...action.payload, quantInOrder: 1, alreadyInOrder: true };
                return { ...state, orderList: [...state.orderList, preBasket] };
            }
        },
        setClearOrder(state) {
            return initialState;
        },
    },
});

// export const selectProducts = (state: RootState) => state.products.products;
// export const lastViewedProducts = (state: RootState) => state.products.lastViewedProducts;

export const { setProductInBasket, setClearOrder } = orderSlice.actions;

export default orderSlice.reducer;
