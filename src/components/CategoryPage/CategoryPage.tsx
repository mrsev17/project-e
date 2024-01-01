import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { selectProducts, Product } from '../../redux/productsSlice';
import { resetFilters, selectDependncies, selectCompanies } from '../../redux/filterSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { CategoryList, Pagination, AccordionMUI } from '../../components';
import { selectMode } from '../../redux/modeSlice';
import styles from './CategoryPage.module.css';

export const CategoryPage = () => {
    const getMode: boolean = useAppSelector(selectMode);
    const getCompanies: (string | number)[] = useAppSelector(selectCompanies);
    const dependencies: (string | number)[] = useAppSelector(selectDependncies);
    const updateDepies = dependencies.filter((item) => !getCompanies.includes(item));
    const products: Product[] = useAppSelector(selectProducts);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(9);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { pathname } = location;

    const getTargetCategoryItems = (name: string, data: Product[]): Product[] => {
        return data.filter((product) => product.category === name);
    };
    const targetData: Product[] = getTargetCategoryItems(pathname.substring(1), products);
    const filterDataByDepends = (dependencies: (string | number)[], targetProducts: Product[]) => {
        if (getCompanies.length && updateDepies.length) {
            const copyOfData = [...targetProducts];
            const filterDataByCompanies = copyOfData.filter((item) => getCompanies.includes(item.company));
            const indexesOfDepies = filterDataByCompanies.reduce((acc: number[], product: Product, index: number) => {
                for (let i = 0; i <= dependencies.length; i += 1) {
                    if (Object.values(product).includes(dependencies[i])) {
                        acc.push(index);
                    }
                }
                return acc;
            }, []);
            indexesOfDepies.sort((a, b) => b - a);
            const filterData = filterDataByCompanies.filter((_, index) => indexesOfDepies.includes(index));
            return filterData;
        } else if (getCompanies.length && !updateDepies.length) {
            const copyOfData = [...targetProducts];
            const filterDataByCompanies = copyOfData.filter((item) => getCompanies.includes(item.company));
            const indexesOfDepies = filterDataByCompanies.reduce((acc: number[], product: Product, index: number) => {
                for (let i = 0; i <= dependencies.length; i += 1) {
                    if (Object.values(product).includes(dependencies[i])) {
                        acc.push(index);
                    }
                }
                return acc;
            }, []);
            indexesOfDepies.sort((a, b) => b - a);
            const filterData = filterDataByCompanies.filter((_, index) => indexesOfDepies.includes(index));
            return filterData;
        } else {
            const copyOfData = [...targetProducts];
            const indexesOfDepies = copyOfData.reduce((acc: number[], product: Product, index: number) => {
                for (let i = 0; i <= updateDepies.length; i += 1) {
                    if (Object.values(product).includes(updateDepies[i])) {
                        acc.push(index);
                    }
                }
                return acc;
            }, []);
            indexesOfDepies.sort((a, b) => b - a);
            const filterData = copyOfData.filter((_, index) => indexesOfDepies.includes(index));
            return filterData;
        }
    };
    const updateAfterFilters: Product[] = filterDataByDepends(dependencies, targetData);
    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    const chooseOption = () => {
        if (dependencies.length === 0) {
            return targetData;
        } else {
            return updateAfterFilters;
        }
    };
    const actualData = chooseOption();
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

    const entriesForFilters = filtersData(targetData, ['photos', 'productName', 'category', 'inStock', 'id', 'isFavorite', 'price', 'description']);
    const entriesRemoveDuplicates = removeDuplicatesFromObject(entriesForFilters);
    const updateAfterFiltersTwo: Product[] = filterDataByDepends(updateDepies, actualData);
    const clearFiltersHandle = useCallback(() => {
        dispatch(resetFilters());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
        clearFiltersHandle();
    }, [location.pathname, clearFiltersHandle]);

    function checkValuesInArray(firstArray: (string | number)[], secondArray: (string | number)[]) {
        const secondSet = new Set(secondArray);
        for (const element of firstArray) {
            if (secondSet.has(element)) {
                secondSet.delete(element);
            }
        }
        return secondSet.size === 0;
    }

    const finalDataCheck = () => {
        if (getCompanies.length && updateDepies.length) {
            return updateAfterFiltersTwo;
        } else if (getCompanies.length && !updateDepies.length) {
            return actualData;
        } else if (!getCompanies.length && updateDepies.length) {
            return actualData;
        } else {
            let result = [];
            for (let target of actualData) {
                const valuesTarget = Object.values(target);
                const checkMatch = checkValuesInArray(valuesTarget, updateDepies);
                if (checkMatch) result.push(target);
            }
            return result;
        }
    };
    const finalData = finalDataCheck();

    const currentProducts: Product[] = finalData.slice(firstProductIndex, lastProductIndex);

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
                        {/* <CategoryList targetData={getCompanies.length ? updateAfterFiltersTwo : currentProducts} /> */}
                        <CategoryList targetData={currentProducts} />
                        <Pagination totalItems={finalData.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};
