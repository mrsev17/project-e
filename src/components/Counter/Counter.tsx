import { useAppDispatch, useAppSelector } from '../../hook';
import { setCounterPlusOne, setCounterMinusOne, resetCounter, selectCounter } from '../../redux/counterSlice';
import styles from './Counter.module.css';

export const Counter = () => {
    const dispatch = useAppDispatch();
    const counter: number = useAppSelector(selectCounter).counter;

    const plusOneHandle = () => {
        dispatch(setCounterPlusOne());
    };
    const minusOneHandle = () => {
        dispatch(setCounterMinusOne());
    };
    const resetCounterHandle = () => {
        dispatch(resetCounter());
    };
    return (
        <div className={styles.counter}>
            <div>
                <h1>{counter}</h1>
            </div>
            <div className={styles.counter__control__panel}>
                <button onClick={plusOneHandle}>Plus One</button>
                <button onClick={minusOneHandle}>Minus One</button>
                <button onClick={resetCounterHandle}>Reset</button>
            </div>
        </div>
    );
};
