import { Product } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import { selectTitleFilter, setTitleFilter } from '../../redux/filterSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './CatalogList.module.css';

interface CatalogListProps {
    currentProducts: Product[];
    setCurrentPage: (page: number) => void;
}

export const CatalogList: React.FC<CatalogListProps> = ({ currentProducts, setCurrentPage }) => {
    const getMode: boolean = useAppSelector(selectMode);
    const dispatch = useAppDispatch();
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentPage(1);
        dispatch(setTitleFilter(e.target.value));
    };
    // const sortFromLowToHigh = (data: Product[]) => {
    //     return data.sort((productA, productB) => {
    //         return productA.price - productB.price;
    //     });
    // };
    // console.log(sortFromLowToHigh(currentProducts));
    return (
        <>
            <div className={getMode ? styles.searchCatalogList : styles.searchCatalogListLigth}>
                <input type='text' value={titleFilter} onChange={handleTitleFilterChange} maxLength={18} placeholder='Search product...' />
            </div>
            <div className={styles.catalogList}>
                {currentProducts.map((product, i) => {
                    return <ProductTile key={i} product={product} />;
                })}
            </div>
        </>
    );
};
