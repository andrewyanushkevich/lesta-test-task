import Image from "next/image";
import styles from "./page.module.css";
import TanksTable from "../features/tanks/components/TanksTable";

export default function Home() {
  return (
    <div className={styles.page}>
      <TanksTable />
    </div>
  );
}
