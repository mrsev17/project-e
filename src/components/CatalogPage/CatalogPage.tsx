import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import './CatalogPage.css';

export const CatalogPage = () => {
    const products = useAppSelector(selectProducts);
    console.log(products);
    return (
        <div>
            <h1 className='title-catalog-page'>Catalog Page</h1>
            <div className='catalog-list'>
                {products.map((product) => {
                    return (
                        <div key={product.id} className='product-card'>
                            <h2>Product Name: {product.productName}</h2>
                            <h3>Company Name: {product.company}</h3>
                            <h3>Color: {product.color}</h3>
                            <h4>storage: {product.storage}</h4>
                            <h4>RAM: {product.storage}</h4>
                            <div className='images-wrapper'>
                                <img className='image-product' src={product.photos.photoOne} alt={product.productName} />
                                {/* {Object.values(product.photos).map((photo, i) => {
                                    return <img className='image-product' key={i} src={photo} alt={product.productName} />;
                                })} */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
