import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import TanksTable from "./TanksTable";
import { MOCK_TANK_T34 } from "@/src/api/tanks/tanks.mocks";

const sampleTank = MOCK_TANK_T34;

describe("TanksTable", () => {
  it("renders table headers", () => {
    render(<TanksTable tanks={[]} />);

    screen.getByText("Техника");
    screen.getByText("Описание");
    screen.getByText("Цена");
    screen.getByText("Уровень");
    screen.getByText("Нация");
    screen.getByText("Класс");
    screen.getByText("ID");
  });

  it("renders tank row with formatted fields", () => {
    const tank = sampleTank;

    render(<TanksTable tanks={[tank]} />);

    const [nameCell] = screen.getAllByText(tank.name);
    const row = nameCell.closest("tr");
    expect(row).toBeTruthy();
    const utils = row ? within(row) : screen;

    const nameMatches = utils.getAllByText(tank.name);
    expect(nameMatches.length).toBeGreaterThanOrEqual(1);
    utils.getByText(tank.description);
    utils.getByText(String(tank.price_gold));

    const romanNumerals = [
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
    ];
    const expectedTier = romanNumerals[tank.tier - 1];
    utils.getByText(expectedTier);

    const expectedNation = tank.nation.replace("_", " ");
    utils.getByText(expectedNation);

    utils.getByText(tank.type.toUpperCase());

    utils.getByText(`#${tank.tank_id}`);
  });
});
