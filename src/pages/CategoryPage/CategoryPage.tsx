import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { useLocation } from 'react-router-dom';
import { Product } from '../../redux/productsSlice';
import { resetFilters } from '../../redux/filterSlice';
import { CategoryList, Pagination, AccordionMUI } from '../../components';
import styles from './CategoryPage.module.css';
import { match } from 'assert';

export const CategoryPage = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.mode);
    const products: Product[] = useAppSelector((state) => state.products.products);
    const notTrackedFilters: string[] = useAppSelector((state) => state.filter.notTrackedDataFilters);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { pathname } = location;

    // Logic for render filters options by category

    const getCategoryName: string = pathname.substring(1);
    //
    const getProductsByCategory = (nameOfCategory: string, data: Product[]): Product[] => {
        return data.filter((product) => product.category === nameOfCategory);
    };
    const getTargetProductsPag = getProductsByCategory(getCategoryName, products);
    //

    const makeFiltersByCategory = (data: Product[], categoryName: string, untrackableKeys: string[]) => {
        const collectKeys: string[] = [];

        const getTargetProducts: Product[] = getProductsByCategory(categoryName, products);
        for (const product of getTargetProducts) {
            const getKeys: string[] = Object.keys(product);
            getKeys.forEach((key: string) => {
                if (!collectKeys.includes(key) && !untrackableKeys.includes(key)) {
                    collectKeys.push(key);
                }
            });
        }
        interface LayerForFilters {
            [key: string]: (string | number)[];
        }
        const layerForFilters: LayerForFilters = collectKeys.reduce((acc, key: string | number) => {
            acc[key] = [];
            return acc;
        }, {} as LayerForFilters);
        interface ProductForFilters {
            [key: string]: any;
        }
        for (const keyFilter in layerForFilters) {
            getTargetProducts.forEach((product: ProductForFilters) => {
                for (const keyProduct in product) {
                    if (keyFilter === keyProduct && !layerForFilters[keyFilter].includes(product[keyProduct])) {
                        layerForFilters[keyFilter].push(product[keyProduct]);
                    }
                }
            });
        }
        for (const keyReadyFilter in layerForFilters) {
            if (typeof layerForFilters[keyReadyFilter][0] === 'string') {
                layerForFilters[keyReadyFilter] = (layerForFilters[keyReadyFilter] as string[]).sort();
            }
            if (typeof layerForFilters[keyReadyFilter][0] === 'number') {
                layerForFilters[keyReadyFilter] = (layerForFilters[keyReadyFilter] as number[]).sort((valueA, valueB) => valueA - valueB);
            }
        }
        return layerForFilters;
    };
    interface ResultDataWithFilters {
        [key: string]: (string | number)[];
    }
    const resultDataWithFilters: ResultDataWithFilters = makeFiltersByCategory(products, getCategoryName, notTrackedFilters);
    const getEntriesFilters = Object.entries(resultDataWithFilters);

    // = = = = = = = = = = = = = = = = = = = //

    // Filters in work V.2

    // const getCompanies: (string | number)[] = useAppSelector((state) => state.filter.companies);
    const dependencies = useAppSelector((state) => state.filter.dependencies);

    const dataAfterDependencies = () => {
        // console.log(getTargetProductsPag);
        console.log(dependencies);
        interface ProductMod extends Product {
            [key: string]: any;
            // other properties if you have specific ones with known types
        }

        // const result: Product[] = getTargetProductsPag.reduce((acc: Product[], product: ProductMod) => {
        //     for (const key in product) {
        //         console.log('key', product[key]);
        //         if (dependencies[key]?.includes(product[key])) {
        //             acc.push(product);
        //         }
        //     }
        //     return acc;
        // }, [] as Product[]);
        const result: Product[] = getTargetProductsPag.reduce((acc: Product[], product: ProductMod) => {
            if (Object.keys(dependencies).every((key) => dependencies[key]?.includes(product[key]))) {
                acc.push(product);
            }
            return acc;
        }, [] as Product[]);

        return result;
    };
    console.log(dataAfterDependencies());
    const productsAfterFilters = dataAfterDependencies();

    // console.log('Get Companies', getCompanies);
    // console.log('Get depies', dependencies);
    // console.log(dependencies);

    // Filters in work V.1

    // const getCompanies: (string | number)[] = useAppSelector((state) => state.filter.companies);
    // const dependencies: (string | number)[] = useAppSelector((state) => state.filter.dependencies);
    // const updateDepies = dependencies.filter((item) => !getCompanies.includes(item));

    // const getTargetCategoryItems = (name: string, data: Product[]): Product[] => {
    //     return data.filter((product) => product.category === name);
    // };
    // const targetData: Product[] = getTargetCategoryItems(getCategoryName, products);
    // const filterDataByDepends = (dependencies: (string | number)[], targetProducts: Product[]) => {
    //     if (getCompanies.length && updateDepies.length) {
    //         const copyOfData = [...targetProducts];
    //         const filterDataByCompanies = copyOfData.filter((item) => getCompanies.includes(item.company));
    //         const indexesOfDepies = filterDataByCompanies.reduce((acc: number[], product: Product, index: number) => {
    //             for (let i = 0; i <= dependencies.length; i += 1) {
    //                 if (Object.values(product).includes(dependencies[i])) {
    //                     acc.push(index);
    //                 }
    //             }
    //             return acc;
    //         }, []);
    //         indexesOfDepies.sort((a, b) => b - a);
    //         const filterData = filterDataByCompanies.filter((_, index) => indexesOfDepies.includes(index));
    //         return filterData;
    //     } else if (getCompanies.length && !updateDepies.length) {
    //         const copyOfData = [...targetProducts];
    //         const filterDataByCompanies = copyOfData.filter((item) => getCompanies.includes(item.company));
    //         const indexesOfDepies = filterDataByCompanies.reduce((acc: number[], product: Product, index: number) => {
    //             for (let i = 0; i <= dependencies.length; i += 1) {
    //                 if (Object.values(product).includes(dependencies[i])) {
    //                     acc.push(index);
    //                 }
    //             }
    //             return acc;
    //         }, []);
    //         indexesOfDepies.sort((a, b) => b - a);
    //         const filterData = filterDataByCompanies.filter((_, index) => indexesOfDepies.includes(index));
    //         return filterData;
    //     } else {
    //         const copyOfData = [...targetProducts];
    //         const indexesOfDepies = copyOfData.reduce((acc: number[], product: Product, index: number) => {
    //             for (let i = 0; i <= updateDepies.length; i += 1) {
    //                 if (Object.values(product).includes(updateDepies[i])) {
    //                     acc.push(index);
    //                 }
    //             }
    //             return acc;
    //         }, []);
    //         indexesOfDepies.sort((a, b) => b - a);
    //         const filterData = copyOfData.filter((_, index) => indexesOfDepies.includes(index));
    //         return filterData;
    //     }
    // };
    // const updateAfterFilters: Product[] = filterDataByDepends(dependencies, targetData);

    // const chooseOption = () => {
    //     if (dependencies.length === 0) {
    //         return targetData;
    //     } else {
    //         return updateAfterFilters;
    //     }
    // };
    // const actualData = chooseOption();
    // const updateAfterFiltersTwo: Product[] = filterDataByDepends(updateDepies, actualData);

    // function checkValuesInArray(firstArray: (string | number)[], secondArray: (string | number)[]) {
    //     const secondSet = new Set(secondArray);
    //     for (const element of firstArray) {
    //         if (secondSet.has(element)) {
    //             secondSet.delete(element);
    //         }
    //     }
    //     return secondSet.size === 0;
    // }

    // const finalDataCheck = () => {
    //     if (getCompanies.length && updateDepies.length) {
    //         return updateAfterFiltersTwo;
    //     } else if (getCompanies.length && !updateDepies.length) {
    //         return actualData;
    //     } else if (!getCompanies.length && updateDepies.length) {
    //         return actualData;
    //     } else {
    //         let result = [];
    //         for (let target of actualData) {
    //             const valuesTarget = Object.values(target);
    //             const checkMatch = checkValuesInArray(valuesTarget, updateDepies);
    //             if (checkMatch) result.push(target);
    //         }
    //         return result;
    //     }
    // };

    // Data for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(9);
    // const finalData = finalDataCheck();
    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    // const currentProducts: Product[] = finalData.slice(firstProductIndex, lastProductIndex);

    // = = = = = = = = = = = = = = = = = = = = = = = = //

    // Reset filters

    const clearFiltersHandle = useCallback(() => {
        dispatch(resetFilters());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
        clearFiltersHandle();
    }, [location.pathname, clearFiltersHandle]);

    return (
        <div className={styles.categoryPage}>
            <div className={styles.categoryPageContent}>
                <h2 className={styles.categoryTitle}>{getCategoryName}</h2>
                <div className={styles.categoryWrapperContent}>
                    <div className={getMode ? styles.filter : styles.filterLight}>
                        <button className={getMode ? styles.removeFiltersBtnDark : styles.removeFiltersBtnLight} onClick={clearFiltersHandle}>
                            Remove all filters
                        </button>
                        <div className={styles.priceSelector}>
                            <span>Price:</span>
                            <div className={styles.priceInputs}></div>
                        </div>
                        {getEntriesFilters.map(([category, options]) => (
                            <AccordionMUI key={category} category={category} options={options} setCurrentPage={setCurrentPage} />
                        ))}
                    </div>
                    <div className={styles.categoryPageBottom}>
                        <CategoryList targetData={productsAfterFilters} />
                        <Pagination
                            totalItems={productsAfterFilters.length}
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
