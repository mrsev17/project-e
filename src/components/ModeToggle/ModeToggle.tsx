import { FaRegMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import { setMode, selectMode } from '../../redux/modeSlice';
import { useAppSelector, useAppDispatch } from '../../hook';
import styles from './ModeToggle.module.css';

export const ModeToggle = () => {
    const dispatch = useAppDispatch();
    const getMode = useAppSelector(selectMode);
    document.body.style.backgroundColor = getMode ? '#385170' : '#f1f1f1';
    const changeMode = () => dispatch(setMode());
    return (
        <button className={styles.button} onClick={changeMode}>
            {getMode ? <IoSunnyOutline className={styles.sunny} /> : <FaRegMoon className={styles.moon} />}
        </button>
    );
};
