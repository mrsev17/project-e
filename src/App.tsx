import { useAppDispatch, useAppSelector } from './hook';
import { setCounterPlusOne, setCounterMinusOne, resetCounter, selectCounter } from './redux/counterSlice';
import './App.css';

const App: React.FC = () => {
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
        <div className='app'>
            <div className='app-counter'>
                <h1>{counter}</h1>
            </div>
            <div className='app-counter-plus-one'>
                <button onClick={plusOneHandle}>Plus One</button>
                <button onClick={minusOneHandle}>Minus One</button>
                <button onClick={resetCounterHandle}>Reset</button>
            </div>
        </div>
    );
};

export default App;
