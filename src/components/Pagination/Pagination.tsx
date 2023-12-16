import { useAppSelector } from '../../hooks/hook';
import { selectMode } from '../../redux/modeSlice';
import styles from './Pagination.module.css';

interface PaginationProps {
    totalItems: number;
    productsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalItems, productsPerPage, setCurrentPage, currentPage }) => {
    const getMode: boolean = useAppSelector(selectMode);
    let pages: number[] = [];
    for (let i = 1; i <= Math.ceil(totalItems / productsPerPage); i += 1) {
        pages.push(i);
    }
    return (
        <div className={getMode ? styles.paginationDark : styles.paginationLight}>
            {pages.length !== 1 ? (
                pages.map((page, i) => {
                    return (
                        <button key={i} onClick={() => setCurrentPage(page)} className={page === currentPage ? styles.active : ''}>
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
