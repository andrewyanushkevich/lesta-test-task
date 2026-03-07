"use client";

import TanksTable from "../TanksTable";
import Pagination from "../Pagination";
import { FC, useMemo, useState } from "react";
import { Tank } from "@/src/api/tanks/tanks.types";
import Filters from "../Filters";
import { normalizeString } from "@/src/features/tanks/utils/utils";

/**
 * Props for the `TanksPage` component.
 */
interface TanksPageProps {
  /**
   * Full list of tanks loaded from the API.
   */
  tanks: Tank[];
}

/**
 * Client-side page that wires filters, table and pagination
 * together to browse and search the tanks list.
 */
const TanksPage: FC<TanksPageProps> = (props) => {
  const { tanks } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [apiSearch, setApiSearch] = useState<string>("");

  const filteredTanks = useMemo(() => {
    const query = normalizeString(search);
    return tanks.filter(
      (v) =>
        normalizeString(v.name).includes(query) ||
        normalizeString(v.short_name).includes(query)
    );
  }, [tanks, search]);

  const paginatedTanks = useMemo(() => {
    return filteredTanks.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage
    );
  }, [currentPage, filteredTanks, itemsPerPage]);

  const handleApiSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    const target = apiSearch.trim().toLowerCase();
    if (!target) return;

    const index = filteredTanks.findIndex(
      (v) => v.name.toLowerCase() === target
    );
    if (index !== -1) {
      setCurrentPage(Math.floor(index / itemsPerPage) + 1);
    }
  };

  const handleSeacrh = (search: string) => {
    setSearch(search);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTanks.length / itemsPerPage);

  return (
    <div>
      <Filters
        filteredTanks={filteredTanks}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        search={search}
        setSearch={handleSeacrh}
        apiSearch={apiSearch}
        setApiSearch={setApiSearch}
        handleApiSearch={handleApiSearch}
      />
      <TanksTable tanks={paginatedTanks} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TanksPage;
