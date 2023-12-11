import { useAppSelector } from '../../hook';
import { selectProducts, Product } from '../../redux/productsSlice';
import { selectDependncies } from '../../redux/filterSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryList, Pagination, AccordionMUI } from '../../components';
import styles from './CategoryPage.module.css';

export const CategoryPage = () => {
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
    console.log(targetData);
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
            const result = targetData;
            return result;
        } else {
            return updateAfterFilters;
        }
    };
    const actualData = chooseOption();
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

    const removeDuplicatesFromObject = (obj: any) => {
        const uniqueValues = {};
        const filterUnique = (value: string | number, index: number, self: any) => {
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
    // console.log(testRemoveDuplicates);
    //
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.categoryPage}>
            <div className={styles.categoryPageContent}>
                <h2 className={styles.categoryTitle}>{pathname.substring(1)}</h2>
                <div className={styles.categoryWrapperContent}>
                    <div className={styles.filter}>
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
