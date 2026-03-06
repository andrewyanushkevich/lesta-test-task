"use client";

import TanksTable from "../TanksTable";
import Pagination from "../Pagination";
import { FC, useMemo, useState } from "react";
import { Tank } from "@/src/api/tanks/tanks.types";

interface TanksPageProps {
  tanks: Tank[];
}

const TanksPage: FC<TanksPageProps> = (props) => {
  const { tanks } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredTanks = useMemo(() => {
    return tanks.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage
    );
  }, [currentPage, itemsPerPage, tanks]);

  const totalPages = Math.ceil(tanks.length / itemsPerPage);

  return (
    <div>
      <TanksTable tanks={filteredTanks} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TanksPage;
