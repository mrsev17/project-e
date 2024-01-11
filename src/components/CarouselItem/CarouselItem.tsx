import Carousel from 'react-bootstrap/Carousel';
import { KeepMountedModal } from '../KeepMounted';
import styles from './CarouselItem.module.css';

interface CarouselProps {
    photos: string[];
    productName: string;
}

export const CarouselItem: React.FC<CarouselProps> = ({ photos, productName }) => {
    const key = photos.join('-');
    return (
        <Carousel interval={100000} key={key}>
            {photos.map((photo: string, i: number) => {
                return (
                    <Carousel.Item key={i}>
                        {/* <KeepMountedModal photo={photo} productName={productName} /> */}
                        <img className={styles.imageItem} src={photo} alt={productName} />
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};
