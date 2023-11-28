import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import { selectMode } from '../../redux/modeSlice';
import { ProductTile } from '../ProductTile';
import './CatalogPage.css';

export const CatalogPage = () => {
    const products = useAppSelector(selectProducts);
    const getMode = useAppSelector(selectMode);

    return (
        <div>
            <h1 className={getMode ? 'title-catalog-page-dark' : 'title-catalog-page-light'}>Catalog Page</h1>
            <div className='catalog-list'>
                {products.map((product, i) => {
                    return <ProductTile key={i} product={product} />;
                })}
            </div>
        </div>
    );
};
