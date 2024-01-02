import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import productsData from '../data/products.json';
import { RootState } from './store';
import { spread } from 'axios';

export interface Product {
    productName: string;
    category: string;
    company: string;
    storage?: number;
    ram?: number;
    cpu?: string;
    color?: string;
    genre?: string;
    size?: string;
    resolution?: string;
    id: string;
    price: number;
    inStock: boolean;
    isFavorite: boolean;
    videoCard?: string;
    diagonal?: number;
    description?: string;
    photos: {
        photoOne: string;
        photoTwo: string;
        photoThree?: string;
        photoFour?: string;
        photoFive?: string;
    };
}

interface ProductInBasket extends Product {
    quantInBask: number;
    alreadyInBasket: boolean;
}

interface ProductsState {
    products: Product[];
    lastViewedProducts: Product[];
    inBasket: ProductInBasket[];
}

const initialState: ProductsState = {
    products: [],
    lastViewedProducts: [],
    inBasket: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setInitialData(state) {
            const prepareData: Product[] = productsData.map((product) => {
                return { ...product, id: uuidv4() };
            });
            return { ...state, products: prepareData };
        },
        setIsFavoriteProduct(state, action: PayloadAction<string>) {
            const prepareData: Product[] = state.products.map((product) => {
                if (product.id === action.payload) {
                    return { ...product, isFavorite: !product.isFavorite };
                }
                return product;
            });
            const checkLastViewed = state.lastViewedProducts.map((product) => {
                if (product.id === action.payload) {
                    return { ...product, isFavorite: !product.isFavorite };
                }
                return product;
            });
            return { ...state, products: prepareData, lastViewedProducts: checkLastViewed };
        },
        setViewedProduct(state, action: PayloadAction<Product>) {
            state.lastViewedProducts = state.lastViewedProducts.filter((product) => product.id !== action.payload.id);
            if (state.lastViewedProducts.length !== 6) {
                state.lastViewedProducts.push(action.payload);
            } else {
                state.lastViewedProducts.shift();
                state.lastViewedProducts.push(action.payload);
            }
        },
        setProductInBasket(state, action: PayloadAction<Product>) {
            const getId = action.payload.id;
            const checkForItem = state.inBasket.some((product) => product.id === getId);
            if (!checkForItem) {
                const preBasket = { ...action.payload, quantInBask: 1, alreadyInBasket: true };
                return { ...state, inBasket: [...state.inBasket, preBasket] };
            }
        },
    },
});

export const selectProducts = (state: RootState) => state.products.products;
export const lastViewedProducts = (state: RootState) => state.products.lastViewedProducts;

export const { setInitialData, setIsFavoriteProduct, setViewedProduct, setProductInBasket } = productsSlice.actions;
export default productsSlice.reducer;
