import { Globe, Search, Settings2 } from "lucide-react";
import styles from "./Filters.module.css";
import { Dispatch, FC, SetStateAction } from "react";
import { Tank } from "@/src/api/tanks/tanks.types";

/**
 * Props for the `Filters` component.
 */
interface FiltersProps {
  /**
   * Number of rows to display per page.
   */
  itemsPerPage: number;
  /**
   * Setter for the number of rows per page.
   */
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  /**
   * Current client-side search query.
   */
  search: string;
  /**
   * Updates the client-side search query.
   */
  setSearch: (search: string) => void;
  /**
   * Current exact-name API search query.
   */
  apiSearch: string;
  /**
   * Setter for the exact-name API search query.
   */
  setApiSearch: Dispatch<SetStateAction<string>>;
  /**
   * Tanks after applying the client-side filter.
   */
  filteredTanks: Tank[];
  /**
   * Handler for submitting the exact-name API search form.
   */
  handleApiSearch: (e: React.SubmitEvent) => void;
}

/**
 * Filters and controls bar for searching tanks and adjusting pagination size.
 */
const Filters: FC<FiltersProps> = (props) => {
  const {
    itemsPerPage,
    setItemsPerPage,
    search,
    setSearch,
    apiSearch,
    setApiSearch,
    filteredTanks,
    handleApiSearch,
  } = props;

  return (
    <section className={styles["controls-bar"]}>
      <div className={styles["controls-bar__search-group"]}>
        <div className={styles["controls-bar__input-wrapper"]}>
          <Search className={styles["controls-bar__icon"]} size={16} />
          <input
            type="text"
            className={styles["controls-bar__input"]}
            placeholder="Фильтр по странице"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <form
          className={styles["controls-bar__input-wrapper"]}
          onSubmit={handleApiSearch}
        >
          <Globe className={styles["controls-bar__icon"]} size={16} />
          <input
            type="text"
            className={styles["controls-bar__input"]}
            placeholder="Поиск по точному имени..."
            value={apiSearch}
            onChange={(e) => setApiSearch(e.target.value)}
          />
        </form>
      </div>

      <div className={styles["controls-bar__settings"]}>
        <div className={styles["controls-bar__select-label"]}>
          <Settings2 size={14} />
          <span>Рядов:</span>
          <select
            className={styles["controls-bar__select"]}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["controls-bar__stats"]}>
          Всего:{" "}
          <span className={styles["controls-bar__stats-val"]}>
            {filteredTanks.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Filters;
