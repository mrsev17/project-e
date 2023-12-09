import { Product } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import styles from './CatalogList.module.css';

interface CatalogListProps {
    currentProducts: Product[];
}

export const CatalogList: React.FC<CatalogListProps> = ({ currentProducts }) => {
    return (
        <div className={styles.catalogList}>
            {currentProducts.map((product, i) => {
                return <ProductTile key={i} product={product} />;
            })}
        </div>
    );
};
