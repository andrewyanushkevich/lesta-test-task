import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Pagination.module.css";
import { getPageNumbers } from "@/src/features/tanks/utils/utils";

/**
 * Props for the `Pagination` component.
 */
interface PaginationProps {
  /**
   * Currently selected page (1-based index).
   */
  currentPage: number;
  /**
   * Total number of available pages.
   */
  totalPages: number;
  /**
   * Setter that updates the current page, accepting either a number
   * or a functional updater.
   */
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

/**
 * Renders pagination controls for navigating between pages of tanks.
 */
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
