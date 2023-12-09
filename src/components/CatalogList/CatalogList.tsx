import { Product } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import { selectTitleFilter, setTitleFilter } from '../../redux/filterSlice';
import { useAppSelector, useAppDispatch } from '../../hook';
import styles from './CatalogList.module.css';

interface CatalogListProps {
    currentProducts: Product[];
    setCurrentPage: (page: number) => void;
}

export const CatalogList: React.FC<CatalogListProps> = ({ currentProducts, setCurrentPage }) => {
    const dispatch = useAppDispatch();
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentPage(1);
        dispatch(setTitleFilter(e.target.value));
    };
    return (
        <>
            <div className={styles.searchCatalogList}>
                <input type='text' value={titleFilter} onChange={handleTitleFilterChange} maxLength={18} />
            </div>
            <div className={styles.catalogList}>
                {currentProducts.map((product, i) => {
                    return <ProductTile key={i} product={product} />;
                })}
            </div>
        </>
    );
};
