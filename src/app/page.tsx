import styles from "./page.module.css";
import { getTanks } from "../api/tanks/tanks.api";
import TanksPage from "../features/tanks/components/TanksPage/TanksPage";

export default async function Home() {
  const tanks = await getTanks();

  return (
    <div className={styles.page}>
      <TanksPage tanks={tanks} />
    </div>
  );
}
