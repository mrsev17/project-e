import { Product } from '../redux/productsSlice';

export const getUniqueCategories = (products: Product[]) => {
    const categories = new Set();
    products.forEach((product: Product) => {
        categories.add(product.category);
    });
    return Array.from(categories);
};
