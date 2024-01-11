import { useAppSelector, useAppDispatch } from '../../hooks/hook';
import { setSortByHighLow } from '../../redux/filterSlice';
import styles from './SortOptions.module.css';

export const SortOptions = () => {
    const dispatch = useAppDispatch();
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    const getSortState: null | 'toLow' | 'toHigh' = useAppSelector((state) => state.filter.sortByHighLow);
    const selectOptionToLow = () => {
        dispatch(setSortByHighLow('toLow'));
    };
    const selectOptionToHigh = () => {
        dispatch(setSortByHighLow('toHigh'));
    };
    return (
        <div className={styles.sortOptions}>
            <span className={getMode ? styles.sortOptionsTitleDark : styles.sortOptionsTitleLight}>Sort</span>
            <div className={getMode ? `${styles.sortOptionsControlDark}` : styles.sortOptionsControlLight}>
                <button
                    onClick={selectOptionToLow}
                    className={
                        getSortState === 'toLow'
                            ? `${getMode ? styles.activeSortDark : styles.activeSortLight}`
                            : `${getMode ? styles.sortOptionsControlDarkBtn : styles.sortOptionsControlLightBtn}`
                    }
                >
                    To Low
                </button>
                <button
                    onClick={selectOptionToHigh}
                    className={
                        getSortState === 'toHigh'
                            ? `${getMode ? styles.activeSortDark : styles.activeSortLight}`
                            : `${getMode ? styles.sortOptionsControlDarkBtn : styles.sortOptionsControlLightBtn}`
                    }
                >
                    To High
                </button>
            </div>
        </div>
    );
};
