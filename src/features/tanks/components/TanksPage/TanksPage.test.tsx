import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TanksPage from "./TanksPage";
import {
  MOCK_TANK_T34,
  MOCK_TANK_M7_WAYFARER,
  MOCK_TANK_AMX_50_100,
} from "@/src/api/tanks/tanks.mocks";

describe("TanksPage", () => {
  it("filters tanks by search input and updates total count", async () => {
    const user = userEvent.setup();

    render(
      <TanksPage
        tanks={[MOCK_TANK_T34, MOCK_TANK_M7_WAYFARER, MOCK_TANK_AMX_50_100]}
      />
    );

    screen.getByText("Всего:");
    screen.getByText("3");

    const filterInput = screen.getByPlaceholderText("Фильтр по странице");

    await user.type(filterInput, "Wayfarer");

    screen.getByText("Wayfarer");
    expect(screen.queryByText("AMX 50 100")).toBeNull();
    expect(screen.queryByText("Т-34")).toBeNull();

    const stats = screen.getByText("Всего:").closest("div");
    const statsUtils = stats ? within(stats) : screen;
    statsUtils.getByText("1");
  });
});
