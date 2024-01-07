import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { setMode } from '../../redux/modeSlice';
import { FaRegMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import styles from './ModeToggle.module.css';

export const ModeToggle: React.FC = () => {
    const dispatch = useAppDispatch();
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const changeMode = () => dispatch(setMode());
    return (
        <button className={styles.button} onClick={changeMode}>
            {getMode ? <IoSunnyOutline className={styles.sunny} /> : <FaRegMoon className={styles.moon} />}
        </button>
    );
};
