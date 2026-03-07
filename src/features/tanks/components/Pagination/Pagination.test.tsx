import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";

afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("shows current/total and disables first/prev on page 1", async () => {
    const user = userEvent.setup();
    const setCurrentPage = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        setCurrentPage={setCurrentPage}
      />
    );

    screen.getByText("Страница 1 из 3");

    const first = screen.getByTitle("Первая страница");
    const last = screen.getByTitle("Последняя страница");

    expect((first as HTMLButtonElement).disabled).toBe(true);
    expect((last as HTMLButtonElement).disabled).toBe(false);

    const buttons = screen.getAllByRole("button");
    const prev = buttons[1];
    const next = buttons[buttons.length - 2];

    expect((prev as HTMLButtonElement).disabled).toBe(true);
    expect((next as HTMLButtonElement).disabled).toBe(false);

    await user.click(last);
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it("clicking next/prev uses updater functions and page number sets direct value", async () => {
    const user = userEvent.setup();
    const setCurrentPage = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        setCurrentPage={setCurrentPage}
      />
    );

    const [page3] = screen.getAllByRole("button", { name: "3" });
    await user.click(page3);
    expect(setCurrentPage).toHaveBeenCalledWith(3);

    const buttons = screen.getAllByRole("button");
    const prev = buttons[1];
    const next = buttons[buttons.length - 2];

    await user.click(prev);
    const prevArg = setCurrentPage.mock.calls.find(
      (c) => typeof c[0] === "function"
    )?.[0] as ((p: number) => number) | undefined;
    expect(prevArg?.(2)).toBe(1);

    await user.click(next);
    const updaterCalls = setCurrentPage.mock.calls.filter(
      (c) => typeof c[0] === "function"
    );
    const lastUpdater = updaterCalls[updaterCalls.length - 1]?.[0];
    expect(lastUpdater(2)).toBe(3);
  });
});
