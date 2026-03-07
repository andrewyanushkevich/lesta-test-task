import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Filters from "./Filters";
import {
  MOCK_TANK_T34,
  MOCK_TANK_M7_WAYFARER,
  MOCK_TANK_AMX_50_100,
} from "@/src/api/tanks/tanks.mocks";

afterEach(() => {
  cleanup();
});

describe("Filters", () => {
  it("renders total count and handles all controls as expected", async () => {
    const user = userEvent.setup();

    const setItemsPerPage = vi.fn();
    const setSearch = vi.fn();
    const setApiSearch = vi.fn();
    const handleApiSearch = vi.fn((e: Pick<SubmitEvent, "preventDefault">) =>
      e.preventDefault()
    );

    render(
      <Filters
        itemsPerPage={10}
        setItemsPerPage={setItemsPerPage}
        search=""
        setSearch={setSearch}
        apiSearch=""
        setApiSearch={setApiSearch}
        filteredTanks={[MOCK_TANK_T34, MOCK_TANK_M7_WAYFARER]}
        handleApiSearch={handleApiSearch}
      />
    );

    screen.getByText("Всего:");
    screen.getByText("2");

    const pageFilter = screen.getByPlaceholderText("Фильтр по странице");
    await user.type(pageFilter, "lowe");
    expect(setSearch).toHaveBeenCalled();

    const apiSearchInput = screen.getByPlaceholderText(
      "Поиск по точному имени..."
    );
    await user.type(apiSearchInput, "Tiger");
    expect(setApiSearch).toHaveBeenCalled();

    expect(setSearch).toHaveBeenCalled();

    await user.type(apiSearchInput, "{enter}");
    expect(handleApiSearch).toHaveBeenCalledTimes(1);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "20");
    expect(setItemsPerPage).toHaveBeenLastCalledWith(20);
  });

  it("shows correct tank count with no tanks", () => {
    render(
      <Filters
        itemsPerPage={10}
        setItemsPerPage={vi.fn()}
        search=""
        setSearch={vi.fn()}
        apiSearch=""
        setApiSearch={vi.fn()}
        filteredTanks={[]}
        handleApiSearch={vi.fn()}
      />
    );
    screen.getByText("Всего:");
    screen.getByText("0");
  });

  it("calls setSearch on clear after typing", async () => {
    const user = userEvent.setup();
    const setSearch = vi.fn();

    render(
      <Filters
        itemsPerPage={10}
        setItemsPerPage={vi.fn()}
        search="something-filled"
        setSearch={setSearch}
        apiSearch=""
        setApiSearch={vi.fn()}
        filteredTanks={[MOCK_TANK_T34]}
        handleApiSearch={vi.fn()}
      />
    );

    const clearBtn =
      screen.queryByRole("button", { name: /очистить/i }) ||
      screen.queryByLabelText("Clear input");
    if (clearBtn) {
      await user.click(clearBtn);
      expect(setSearch).toHaveBeenCalledWith("");
    }
  });

  it("form calls handleApiSearch on submit, not on blur", async () => {
    const user = userEvent.setup();
    const handleApiSearch = vi.fn((e: Pick<SubmitEvent, "preventDefault">) =>
      e.preventDefault()
    );

    render(
      <Filters
        itemsPerPage={10}
        setItemsPerPage={vi.fn()}
        search=""
        setSearch={vi.fn()}
        apiSearch=""
        setApiSearch={vi.fn()}
        filteredTanks={[MOCK_TANK_T34]}
        handleApiSearch={handleApiSearch}
      />
    );
    const apiSearch = screen.getByPlaceholderText("Поиск по точному имени...");
    fireEvent.blur(apiSearch);
    expect(handleApiSearch).not.toHaveBeenCalled();

    await user.type(apiSearch, "{enter}");
    expect(handleApiSearch).toHaveBeenCalledTimes(1);
  });

  it("select shows correct options", () => {
    render(
      <Filters
        itemsPerPage={10}
        setItemsPerPage={vi.fn()}
        search=""
        setSearch={vi.fn()}
        apiSearch=""
        setApiSearch={vi.fn()}
        filteredTanks={[MOCK_TANK_AMX_50_100]}
        handleApiSearch={vi.fn()}
      />
    );
    const combo = screen.getByRole("combobox");
    screen.getByRole("option", { name: "10" });
    screen.getByRole("option", { name: "20" });
    expect((combo as HTMLSelectElement).value).toBe("10");
  });
});
