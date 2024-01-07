import { useAppSelector } from '../../hooks/hook';
import { Product } from '../../redux/productsSlice';
import { LastViewedTile } from '../LastViewedTile';
import styles from './LastCheckdProducts.module.css';

export const LastCheckdProducts: React.FC = () => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const lastViewed: Product[] = useAppSelector((state) => state.products.lastViewedProducts);
    return (
        <section className={getMode ? styles.lastViewedDark : styles.lastViewedLight}>
            {lastViewed.length !== 0 ? <h3>Rescent view</h3> : ''}
            <div className={styles.lastViewedContainer}>
                {lastViewed.map((item: Product, i: number) => {
                    return <LastViewedTile key={i} product={item} />;
                })}
            </div>
        </section>
    );
};
