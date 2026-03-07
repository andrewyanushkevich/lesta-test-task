import styles from "./TanksTable.module.css";
import Image from "next/image";
import { FC } from "react";
import { Tank } from "@/src/api/tanks/tanks.types";

/**
 * Props for the `TanksTable` component.
 */
interface TanksTableProps {
  /**
   * List of tanks to render in the table.
   */
  tanks: Tank[];
}

/**
 * Displays a tabular view of tanks with image, description and key stats.
 */
const TanksTable: FC<TanksTableProps> = (props) => {
  const { tanks } = props;

  return (
    <div className={styles["tank-table-container"]}>
      <table className={styles["tank-table"]}>
        <thead className={styles["tank-table__head"]}>
          <tr>
            <th className={styles["tank-table__th"]}>Техника</th>
            <th className={styles["tank-table__th"]}>Описание</th>
            <th className={styles["tank-table__th"]}>Цена</th>
            <th className={styles["tank-table__th"]}>Уровень</th>
            <th className={styles["tank-table__th"]}>Нация</th>
            <th className={styles["tank-table__th"]}>Класс</th>
            <th
              className={styles["tank-table__th"]}
              style={{ textAlign: "right" }}
            >
              ID
            </th>
          </tr>
        </thead>
        <tbody>
          {tanks.map((tank) => (
            <tr key={tank.tank_id} className={styles["tank-table__row"]}>
              <td className={styles["tank-table__td"]}>
                <div className={styles["tank-info"]}>
                  <div className={styles["tank-info__image-box"]}>
                    <Image
                      width={64}
                      height={40}
                      src={tank.images.big_icon}
                      alt={tank.name}
                      className={styles["tank-info__img"]}
                    />
                  </div>
                  <div>
                    <div className={styles["tank-info__name"]}>{tank.name}</div>
                    <div className={styles["tank-info__short"]}>
                      {tank.short_name}
                    </div>
                  </div>
                </div>
              </td>
              <td className={styles["tank-table__td"]}>{tank.description}</td>
              <td className={styles["tank-table__td"]}>{tank.price_gold}</td>
              <td className={styles["tank-table__td"]}>
                <span className={styles["tier-label"]}>
                  {
                    [
                      "I",
                      "II",
                      "III",
                      "IV",
                      "V",
                      "VI",
                      "VII",
                      "VIII",
                      "IX",
                      "X",
                    ][tank.tier - 1]
                  }
                </span>
              </td>
              <td
                className={styles["tank-table__td"]}
                style={{ textTransform: "capitalize", color: "#666" }}
              >
                {tank.nation.replace("_", " ")}
              </td>
              <td className={styles["tank-table__td"]}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.75rem",
                  }}
                >
                  {/* <Shield style={{ width: "12px", color: "#444" }} /> */}
                  {tank.type.toUpperCase()}
                </div>
              </td>
              <td
                className={`${styles["tank-table__td"]} ${styles["tank-table__td--id"]}`}
              >
                #{tank.tank_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanksTable;
