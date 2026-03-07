import { afterEach, describe, expect, it, vi } from "vitest";

import { getTanks } from "./tanks.api";
import {
  MOCK_TANK_T34,
  MOCK_TANK_M7_WAYFARER,
} from "./tanks.mocks";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("getTanks", () => {
  it("returns tanks array from API response", async () => {
    const tank1 = MOCK_TANK_T34;
    const tank2 = MOCK_TANK_M7_WAYFARER;

    const fetchMock = vi.fn(async () => {
      return {
        json: async () => ({
          data: {
            1: tank1,
            2: tank2,
          },
        }),
      } as unknown as Response;
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getTanks()).resolves.toEqual([tank1, tank2]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/wot/encyclopedia/vehicles/")
    );
  });

  it("returns empty array and logs error when fetch fails", async () => {
    const err = new Error("network down");
    const fetchMock = vi.fn(async () => {
      throw err;
    });
    vi.stubGlobal("fetch", fetchMock);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(getTanks()).resolves.toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith("Error fetching tanks:", err);
  });
});

