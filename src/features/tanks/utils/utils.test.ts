import { describe, expect, it } from "vitest";

import { getPageNumbers, normalizeString } from "./utils";

describe("normalizeString", () => {
  it("lowercases and removes diacritics", () => {
    expect(normalizeString("Löwe")).toBe("lowe");
    expect(normalizeString("Škoda T 25")).toBe("skoda t 25");
  });

  it("keeps ascii characters intact aside from lowercasing", () => {
    expect(normalizeString("Tiger II")).toBe("tiger ii");
    expect(normalizeString("m4a1")).toBe("m4a1");
  });

  it("handles empty string", () => {
    expect(normalizeString("")).toBe("");
  });
});

describe("getPageNumbers", () => {
  it("returns all pages when totalPages <= 5", () => {
    expect(getPageNumbers(1, 1)).toEqual([1]);
    expect(getPageNumbers(5, 3)).toEqual([1, 2, 3, 4, 5]);
  });

  it("pins to first 5 pages when near the start", () => {
    expect(getPageNumbers(10, 1)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageNumbers(10, 2)).toEqual([1, 2, 3, 4, 5]);
  });

  it("shows a sliding window in the middle", () => {
    expect(getPageNumbers(10, 5)).toEqual([3, 4, 5, 6, 7]);
    expect(getPageNumbers(10, 6)).toEqual([4, 5, 6, 7, 8]);
  });

  it("pins to last 5 pages when near the end", () => {
    expect(getPageNumbers(10, 9)).toEqual([6, 7, 8, 9, 10]);
    expect(getPageNumbers(10, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});
