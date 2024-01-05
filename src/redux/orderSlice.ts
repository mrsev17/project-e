import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

export interface OrderSlice extends Product {
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
            const getAmount = getItem.price * getItem.quantInOrder;
            return {
                ...state,
                orderList: state.orderList.filter((product: Product) => product.id !== action.payload),
                finalPrice: state.finalPrice - getAmount,
            };
        },
        setIsFavoriteProductBasket(state, action: PayloadAction<string>) {
            const prepareData: OrderSlice[] = state.orderList.map((product: OrderSlice) => {
                if (product.id === action.payload) {
                    return { ...product, isFavorite: !product.isFavorite };
                }
                return product;
            });
            return { ...state, orderList: prepareData };
        },
        setClearOrder(state) {
            return initialState;
        },
    },
});

export const { setProductInBasket, setProductPlusOne, setProductMinusOne, setRemoveItemFromOrder, setIsFavoriteProductBasket, setClearOrder } =
    orderSlice.actions;
export default orderSlice.reducer;
