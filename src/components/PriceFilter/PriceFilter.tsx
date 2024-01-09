import { useAppDispatch } from '../../hooks/hook';
import { useState } from 'react';
import { setFilterByPrice } from '../../redux/filterSlice';
import styles from './PriceFilter.module.css';

export const PriceFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [inputFrom, setInputFrom] = useState<string | number>('0');
    const [inputTo, setInputTo] = useState<string | number>('0');

    const handleInputFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setInputFrom(newValue);
    };

    const handleInputTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setInputTo(newValue);
    };

    const applyFilterPrice = (from: number, to: number) => {
        if (from > 0 && to > 0 && from <= to) {
            dispatch(setFilterByPrice({ from: from, to: to }));
        } else if (from > to) {
            setInputTo(from);
            dispatch(setFilterByPrice({ from: 0, to: from }));
        } else if (from === 0 && to > 0) {
            dispatch(setFilterByPrice({ from: from, to: to }));
        }
    };

    return (
        <div className={styles.filterPriceDark}>
            <span>Price</span>
            <div className={styles.filterPriceDarkContent}>
                <div className={styles.filterPriceDarkInputs}>
                    <label className={styles.hidden} htmlFor='priceFrom'></label>
                    <input type='text' id='priceFrom' value={inputFrom} onChange={handleInputFrom} placeholder='From...' />
                    <label className={styles.hidden} htmlFor='priceTo'></label>
                    <input type='text' id='priceTo' value={inputTo} onChange={handleInputTo} placeholder='To...' />
                </div>
                <button onClick={() => applyFilterPrice(+inputFrom, +inputTo)} className={styles.filterPriceDarkApply}>
                    Apply price filter
                </button>
            </div>
        </div>
    );
};
