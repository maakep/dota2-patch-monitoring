import { minutesToHourAndMinutes } from "../src/index";

describe("minutesToHourAndMinutes function", () => {
  it("should convert 0 minutes to '0h 0m'", () => {
    expect(minutesToHourAndMinutes(0)).toEqual("0h 0m");
  });

  it("should convert 60 minutes to '1h 0m'", () => {
    expect(minutesToHourAndMinutes(60)).toEqual("1h 0m");
  });

  it("should convert 75 minutes to '1h 15m'", () => {
    expect(minutesToHourAndMinutes(75)).toEqual("1h 15m");
  });

  it("should convert 120 minutes to '2h 0m'", () => {
    expect(minutesToHourAndMinutes(120)).toEqual("2h 0m");
  });

  it("should convert 1439 minutes to '23h 59m'", () => {
    expect(minutesToHourAndMinutes(1439)).toEqual("23h 59m");
  });

  it("should round up to the nearest minute", () => {
    expect(minutesToHourAndMinutes(5)).toEqual("0h 1m");
    expect(minutesToHourAndMinutes(65)).toEqual("1h 5m");
    expect(minutesToHourAndMinutes(135)).toEqual("2h 15m");
  });

  it("should handle negative values", () => {
    expect(minutesToHourAndMinutes(-60)).toEqual("-1h 0m");
    expect(minutesToHourAndMinutes(-120)).toEqual("-2h 0m");
    expect(minutesToHourAndMinutes(-75)).toEqual("-1h 15m");
  });
});
