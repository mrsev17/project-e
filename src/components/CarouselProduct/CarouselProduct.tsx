import { Carousel, IconButton } from '@material-tailwind/react';
import * as React from 'react';
import { KeepMountedModal } from '../KeepMounted';

interface CarouselProps {
    photos: string[];
    productName: string;
}

export const CarouselProduct: React.FC<CarouselProps> = ({ photos, productName }) => {
    return (
        <Carousel
            className='rounded-xl flex items-center'
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
                    {new Array(length).fill('').map((_, i) => (
                        <span
                            key={i}
                            className={`block h-3 cursor-pointer rounded-full transition-all content-[''] ${
                                activeIndex === i ? `w-3 bg-[#222831]` : `w-3 bg-[#222831]/50`
                            }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            prevArrow={({ handlePrev }) => (
                <IconButton className='!absolute top-2/4 left-4 -translate-y-2/4 hidden'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='h-6 w-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton className='!absolute top-2/4 !right-4 -translate-y-2/4 hidden'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='h-6 w-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
                    </svg>
                </IconButton>
            )}
        >
            {photos.map((photo, i) => {
                return <KeepMountedModal key={i} photo={photo} productName={productName} />;
            })}
        </Carousel>
    );
};
