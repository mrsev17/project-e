import { useAppSelector } from '../../hooks/hook';
import styles from './Pagination.module.css';

interface PaginationProps {
    totalItems: number;
    productsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalItems, productsPerPage, setCurrentPage, currentPage }) => {
    const getMode: boolean = useAppSelector((state) => state.mode.modeState);
    let pages: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / productsPerPage); i += 1) {
        pages.push(i);
    }
    const setCurrentPageHandle = (page: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };
    return (
        <div className={getMode ? styles.paginationDark : styles.paginationLight}>
            {pages.length !== 1 ? (
                pages.map((page, i) => {
                    return (
                        <button key={i} onClick={() => setCurrentPageHandle(page)} className={page === currentPage ? styles.active : ''}>
                            {page}
                        </button>
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
};
