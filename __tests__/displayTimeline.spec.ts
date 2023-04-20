import { displayTimeline } from "../src/index";

describe("displayTimeline function", () => {
  it("should display the timeline correctly", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementationOnce(() => {});

    displayTimeline();

    expect(consoleLogSpy).toHaveBeenCalledTimes(11);
    expect(consoleLogSpy.mock.calls[0][0]).toContain("TIMELINE");
    expect(consoleLogSpy.mock.calls[1][0]).toContain("7.");
    expect(consoleLogSpy.mock.calls[2][0]).toContain("8.");
    expect(consoleLogSpy.mock.calls[3][0]).toContain("9.");
    expect(consoleLogSpy.mock.calls[4][0]).toContain("10.");
    expect(consoleLogSpy.mock.calls[5][0]).toContain("|");
    expect(consoleLogSpy.mock.calls[6][0]).toContain("^ now");

    consoleLogSpy.mockRestore();
  });
});
