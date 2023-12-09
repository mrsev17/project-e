import { Product } from '../../redux/productsSlice';
import { ProductTile } from '../ProductTile';
import styles from './CategoryList.module.css';

interface CategoryListProps {
    targetData: Product[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ targetData }) => {
    return (
        <div className={styles.catalogListCategory}>
            {targetData.map((product, i) => {
                return <ProductTile key={i} product={product} />;
            })}
        </div>
    );
};
