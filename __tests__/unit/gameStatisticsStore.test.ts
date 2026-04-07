import { beforeEach, describe, expect, it, afterEach } from "vitest";

import { createGameStatisticsStore } from "../../utils/store/GameStatisticsStore/GameStatisticsStore";

describe("GameStatisticsStore", () => {
  let statisticsStore: ReturnType<typeof createGameStatisticsStore>;

  beforeEach(() => {
    localStorage.clear();
    statisticsStore = createGameStatisticsStore(false, 100);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with the provided offset date", () => {
    const state = statisticsStore?.getState();
    expect(state).toBeTruthy();
    expect(state?.lastOffSetDate).toBe(100);
    expect(state?.gamesPlayed).toBe(1);
    expect(state?.winStreak).toBe(0);
    expect(state?.maxWinStreak).toBe(0);
  });

  it("should increment gamesPlayed when the next day is played", () => {
    statisticsStore?.getState().setGameStatistics(false, 101);
    const state = statisticsStore?.getState();

    expect(state?.gamesPlayed).toBe(2);
    expect(state?.lastOffSetDate).toBe(101);
  });

  it("should reset gamesPlayed after a skipped day", () => {
    statisticsStore?.getState().setGameStatistics(false, 101);
    statisticsStore?.getState().setGameStatistics(false, 103);
    const state = statisticsStore?.getState();

    expect(state?.gamesPlayed).toBe(1);
    expect(state?.lastOffSetDate).toBe(103);
    expect(state?.winStreak).toBe(0);
  });

  it("should reset winStreak after a skipped day and start a new winning streak", () => {
    statisticsStore?.getState().setGameStatistics(true, 101);
    statisticsStore?.getState().setGameStatistics(true, 102);
    statisticsStore?.getState().setGameStatistics(true, 104);
    const state = statisticsStore?.getState();

    expect(state?.gamesPlayed).toBe(1);
    expect(state?.winStreak).toBe(1);
    expect(state?.maxWinStreak).toBe(2);
    expect(state?.lastOffSetDate).toBe(104);
  });

  it("should increase winStreak after a win", () => {
    statisticsStore?.getState().setGameStatistics(true, 101);
    statisticsStore?.getState().setGameStatistics(true, 102);
    const state = statisticsStore?.getState();

    expect(state?.winStreak).toBe(2);
    expect(state?.maxWinStreak).toBe(2);
  });

  it("should reset winStreak after a loss", () => {
    statisticsStore?.getState().setGameStatistics(true, 101);
    statisticsStore?.getState().setGameStatistics(false, 102);
    const state = statisticsStore?.getState();

    expect(state?.winStreak).toBe(0);
    expect(state?.maxWinStreak).toBe(1);
  });

  it("should update maxWinStreak only when current streak exceeds the previous max", () => {
    statisticsStore?.getState().setGameStatistics(true, 101);
    statisticsStore?.getState().setGameStatistics(true, 102);
    statisticsStore?.getState().setGameStatistics(false, 103);
    statisticsStore?.getState().setGameStatistics(true, 104);
    const state = statisticsStore?.getState();

    expect(state?.maxWinStreak).toBe(2);
    expect(state?.winStreak).toBe(1);
  });
});
