import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const getPageNumbers = (totalPages: number, currentPage: number) => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (start === 1) {
      end = 5;
    } else if (end === totalPages) {
      start = totalPages - 4;
    }

    for (let i = start; i <= end; i++) pages.push(i);
  }
  return pages;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, setCurrentPage } = props;

  return (
    <footer className={styles.pagination}>
      <div className={styles.pagination__info}>
        Страница {currentPage} из {totalPages || 1}
      </div>
      <div className={styles.pagination__controls}>
        <button
          className={styles.pagination__btn}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
          title="Первая страница"
        >
          «
        </button>
        <button
          className={styles.pagination__btn}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers(totalPages, currentPage).map((pageNum) => (
          <button
            key={pageNum}
            className={`${styles["pagination__page-btn"]} ${
              currentPage === pageNum
                ? styles["pagination__page-btn--active"]
                : ""
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        <button
          className={styles.pagination__btn}
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ChevronRight size={16} />
        </button>
        <button
          className={styles.pagination__btn}
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(totalPages)}
          title="Последняя страница"
        >
          »
        </button>
      </div>
    </footer>
  );
};

export default Pagination;
