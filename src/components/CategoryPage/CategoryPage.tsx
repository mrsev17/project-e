import { useAppSelector, useAppDispatch } from '../../hook';
import { selectProducts, Product } from '../../redux/productsSlice';
import { resetFilters, selectDependncies } from '../../redux/filterSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryList, Pagination, AccordionMUI } from '../../components';
import { selectMode } from '../../redux/modeSlice';
import { TextField } from '@mui/material';
import styles from './CategoryPage.module.css';
import { clear } from 'console';

export const CategoryPage = () => {
    const getMode: boolean = useAppSelector(selectMode);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(9);
    const location = useLocation();
    const { pathname } = location;
    const products: Product[] = useAppSelector(selectProducts);
    const dependencies: (string | number)[] = useAppSelector(selectDependncies);
    const getTargetCategoryItems = (name: string, data: Product[]): Product[] => {
        return data.filter((product) => product.category === name);
    };
    const targetData: Product[] = getTargetCategoryItems(pathname.substring(1), products);

    const filterDataByDepends = (dependencies: (string | number)[], targetProducts: Product[]) => {
        const copyOfData = [...targetProducts];
        const indexesOfDepies = targetProducts.reduce((acc: number[], product: Product, index: number) => {
            for (let i = 0; i <= dependencies.length; i += 1) {
                if (Object.values(product).includes(dependencies[i])) {
                    acc.push(index);
                }
            }
            return acc;
        }, []);
        indexesOfDepies.sort((a, b) => b - a);
        const filterData = copyOfData.filter((_, index) => indexesOfDepies.includes(index));
        return filterData;
    };
    const updateAfterFilters: Product[] = filterDataByDepends(dependencies, targetData);
    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    const chooseOption = () => {
        if (dependencies.length === 0) {
            // const result = targetData;
            return targetData;
        } else {
            return updateAfterFilters;
        }
    };
    const actualData = chooseOption();
    console.log(actualData);
    const currentProducts: Product[] = actualData.slice(firstProductIndex, lastProductIndex);

    //
    const filtersData = (categoryData: Product[], excludeKeys: string[] = []) => {
        interface ProductFilter {
            [key: string]: any;
        }
        const result: ProductFilter = {};
        categoryData.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
                if (!excludeKeys.includes(key)) {
                    if (!result[key]) {
                        result[key] = [];
                    }
                    result[key].push((obj as any)[key]);
                }
            });
        });
        return result;
    };

    interface UniqieValues {
        company: string[];
        storage?: number[];
        ram?: number[];
        cpu?: string[];
        color?: string[];
        genre?: string[];
        // price: number;
        // inStock: boolean;
        // isFavorite?: boolean;
        videoCard?: string[];
    }

    const removeDuplicatesFromObject = (obj: any) => {
        const uniqueValues = {};
        const filterUnique = (value: string | number, index: number, self: (string | number)[]): boolean => {
            return self.indexOf(value) === index;
        };
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                (uniqueValues as any)[key] = obj[key].filter(filterUnique);
            } else {
                (uniqueValues as any)[key] = obj[key];
            }
        }
        return uniqueValues;
    };

    const entriesForFilters = filtersData(targetData, ['photos', 'productName', 'category', 'inStock', 'id', 'isFavorite', 'price']);
    const entriesRemoveDuplicates = removeDuplicatesFromObject(entriesForFilters);
    //
    const dispatch = useAppDispatch();
    const clearFiltersHandle = () => {
        dispatch(resetFilters());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.categoryPage}>
            <div className={styles.categoryPageContent}>
                <h2 className={styles.categoryTitle}>{pathname.substring(1)}</h2>
                <div className={styles.categoryWrapperContent}>
                    <div className={getMode ? styles.filter : styles.filterLight}>
                        <button className={getMode ? styles.removeFiltersBtnDark : styles.removeFiltersBtnLight} onClick={clearFiltersHandle}>
                            Remove all filters
                        </button>
                        <div className={styles.priceSelector}>
                            <span>Price:</span>
                            <div className={styles.priceInputs}></div>
                        </div>
                        {Object.entries(entriesRemoveDuplicates).map(([category, options]) => (
                            <AccordionMUI key={category} category={category} options={options} setCurrentPage={setCurrentPage} />
                        ))}
                    </div>
                    <div className={styles.categoryPageBottom}>
                        <CategoryList targetData={currentProducts} />
                        <Pagination
                            totalItems={actualData.length}
                            productsPerPage={productsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
