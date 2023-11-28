import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import productsData from '../data/products.json';
import { RootState } from './store';

export interface Product {
    productName: string;
    category: string;
    company: string;
    storage: string;
    ram: string;
    color: string;
    id: string;
    price: number;
    inStock: boolean;
    favorite?: boolean;
    photos: {
        photoOne: string;
        photoTwo: string;
        photoThree: string;
        photoFour: string;
        photoFive: string;
    };
}

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setInitialData(state) {
            const prepareData = productsData.map((product) => {
                return { ...product, id: uuidv4(), favorite: false };
            });
            return { ...state, products: prepareData };
        },
    },
});

export const selectProducts = (state: RootState) => state.products.products;

export const { setInitialData } = productsSlice.actions;
export default productsSlice.reducer;
