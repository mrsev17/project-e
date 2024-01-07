import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { useLocation } from 'react-router-dom';
import { Product } from '../../redux/productsSlice';
import { resetFilters } from '../../redux/filterSlice';
import { CategoryList, Pagination, AccordionMUI } from '../../components';
import styles from './CategoryPage.module.css';

export const CategoryPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(9);
    const lastProductIndex: number = currentPage * productsPerPage;
    const firstProductIndex: number = lastProductIndex - productsPerPage;
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const products: Product[] = useAppSelector((state) => state.products.products);
    const notTrackedFilters: string[] = useAppSelector((state) => state.filter.notTrackedDataFilters);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { pathname } = location;

    const getCategoryName: string = pathname.substring(1);
    const getProductsByCategory = (nameOfCategory: string, data: Product[]): Product[] => {
        return data.filter((product) => product.category === nameOfCategory);
    };
    const getTargetProductsPag: Product[] = getProductsByCategory(getCategoryName, products);

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

    const dependencies = useAppSelector((state) => state.filter.dependencies);

    const dataAfterDependencies = () => {
        interface ProductMod extends Product {
            [key: string]: any;
        }
        const result: Product[] = getTargetProductsPag.reduce((acc: Product[], product: ProductMod) => {
            if (Object.keys(dependencies).every((key) => dependencies[key]?.includes(product[key]))) {
                acc.push(product);
            }
            return acc;
        }, [] as Product[]);

        return result;
    };
    const productsAfterFilters: Product[] = dataAfterDependencies();
    const sortByName = productsAfterFilters.sort((productA, productB) => {
        if (productA.productName < productB.productName) return -1;
        if (productA.productName > productB.productName) return 1;
        return 0;
    });
    const currentProducts: Product[] = sortByName.slice(firstProductIndex, lastProductIndex);

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
                        <CategoryList targetData={currentProducts} />
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
