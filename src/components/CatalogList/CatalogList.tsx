import { Product } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import { setTitleFilter } from '../../redux/filterSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import styles from './CatalogList.module.css';

interface CatalogListProps {
    currentProducts: Product[];
    setCurrentPage: (page: number) => void;
}

export const CatalogList: React.FC<CatalogListProps> = ({ currentProducts, setCurrentPage }) => {
    const getMode: boolean = useAppSelector((state) => state.mode.mode);
    const titleFilter: string = useAppSelector((state) => state.filter.title);
    const dispatch = useAppDispatch();
    const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentPage(1);
        dispatch(setTitleFilter(e.target.value));
    };
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
