const { countdownTimer } = require("../src/countdown");

jest.useFakeTimers();

describe("countdownTimer", () => {
  test("logs time and stops the timer", () => {
    console.log = jest.fn();
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const startTime = 5;
    const interval = 1000;

    const timerId = countdownTimer(startTime, interval);

    // Advance timers by (startTime + 1) intervals to ensure clearInterval runs
    jest.advanceTimersByTime((startTime + 1) * interval);

    // Check console.log called expected number of times with correct args
    expect(console.log).toHaveBeenCalledTimes(startTime);
    for (let i = startTime; i > 0; i--) {
      expect(console.log).toHaveBeenCalledWith(i);
    }

    // Check that clearInterval was called (arg not checked here)
    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
