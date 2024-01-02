import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import { Product } from '../../redux/productsSlice';
import { LastViewedTile } from '../LastViewedTile';
import styles from './LastCheckdProducts.module.css';

export const LastCheckdProducts = () => {
    const getMode: boolean = useAppSelector(selectMode);
    const lastViewed: Product[] = useAppSelector((state) => state.products.lastViewedProducts);
    return (
        <section className={getMode ? styles.lastViewedDark : styles.lastViewedLight}>
            {lastViewed.length !== 0 ? <h3>Last viewed products</h3> : ''}
            <div className={styles.lastViewedContainer}>
                {lastViewed.map((item: Product, i: number) => {
                    return <LastViewedTile key={i} product={item} />;
                })}
            </div>
        </section>
    );
};
