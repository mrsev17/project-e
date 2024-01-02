import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';
import { get } from 'http';

interface OrderSlice extends Product {
    quantInOrder: number;
    alreadyInOrder: boolean;
}

interface InitState {
    orderList: OrderSlice[];
    finalPrice: number;
}

const initialState: InitState = {
    orderList: [],
    finalPrice: 0,
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
                return { ...state, orderList: [...state.orderList, preBasket], finalPrice: state.finalPrice + action.payload.price };
            }
        },
        setProductPlusOne(state, action: PayloadAction<string>) {
            const updatedOrderList = state.orderList.map((item) => (item.id === action.payload ? { ...item, quantInOrder: item.quantInOrder + 1 } : item));
            const getItem = state.orderList.filter((item: OrderSlice) => item.id === action.payload)[0];
            return { ...state, orderList: updatedOrderList, finalPrice: state.finalPrice + getItem.price };
        },
        setProductMinusOne(state, action: PayloadAction<string>) {
            const updatedOrderList = state.orderList.map((item) => (item.id === action.payload ? { ...item, quantInOrder: item.quantInOrder - 1 } : item));
            const getItem = state.orderList.filter((item: OrderSlice) => item.id === action.payload)[0];
            return { ...state, orderList: updatedOrderList, finalPrice: state.finalPrice - getItem.price };
        },
        setRemoveItemFromOrder(state, action: PayloadAction<string>) {
            const getItem = state.orderList.filter((item: OrderSlice) => item.id === action.payload)[0];
            return {
                ...state,
                orderList: state.orderList.filter((product: Product) => product.id !== action.payload),
                finalPrice: state.finalPrice - getItem.price,
            };
        },
        setClearOrder(state) {
            return initialState;
        },
    },
});

// export const selectProducts = (state: RootState) => state.products.products;
// export const lastViewedProducts = (state: RootState) => state.products.lastViewedProducts;

export const { setProductInBasket, setProductPlusOne, setProductMinusOne, setRemoveItemFromOrder, setClearOrder } = orderSlice.actions;
export default orderSlice.reducer;
