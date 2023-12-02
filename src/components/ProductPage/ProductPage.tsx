import { Product } from '../../redux/productsSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hook';
import { selectProducts } from '../../redux/productsSlice';
import './ProductPage.css';

export const ProductPage: React.FC = () => {
    const products: Product[] = useAppSelector(selectProducts);
    const { id } = useParams();
    console.log(id);
    const getTargetProduct: Product = products.filter((product) => product.id === id)[0];
    console.log(getTargetProduct);
    return (
        <div>
            <h2 className='product-info'>{getTargetProduct.productName}</h2>
            <h3 className='product-info'>{getTargetProduct.company}</h3>
            <h3 className='product-info'>{getTargetProduct.category}</h3>
            <h4 className='product-info'>{getTargetProduct.price}$</h4>
            <div className='product-photos-wrapper'>
                <img src={getTargetProduct.photos.photoOne} alt={getTargetProduct.productName} />
                <img src={getTargetProduct.photos.photoTwo} alt={getTargetProduct.productName} />
                <img src={getTargetProduct.photos.photoThree} alt={getTargetProduct.productName} />
                <img src={getTargetProduct.photos?.photoFour} alt={getTargetProduct.productName} />
            </div>
        </div>
    );
};
