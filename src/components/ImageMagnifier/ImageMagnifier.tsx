import { useState } from 'react';
import styles from './ImageMagnifier.module.css';

interface ImageMagnifierProps {
    imgUrl: string;
    productName: string;
}
interface Position {
    x: number;
    y: number;
}

export const ImageMagnifier: React.FC<ImageMagnifierProps> = ({ imgUrl, productName }) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    const [cursorPosition, setCursorPosition] = useState<Position>({ x: 0, y: 0 });

    const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x: number = ((e.pageX - left) / width) * 100;
        const y: number = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });
        setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
    };
    return (
        <div
            className={styles.imgMagnifierContainer}
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseHover}
        >
            <img className={styles.magnifierImg} src={imgUrl} alt={productName} />

            {showMagnifier && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${cursorPosition.x - 100}px`,
                        top: `${cursorPosition.y - 100}px`,
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        className={styles.magnifierImage}
                        style={{
                            backgroundImage: `url(${imgUrl})`,
                            backgroundPosition: `${position.x}% ${position.y}%`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};
