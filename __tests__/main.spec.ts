import PlaySound from "play-sound";
import {
  go,
  displayTimeline,
  displayPatchFound,
  displayPatchNotFound,
} from "../src/index";

const axios = require("axios");
jest.mock("axios");
jest.mock("play-sound");

describe("go function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should display patch found when there are more patches than existing patches", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        patches: [
          { patch_timestamp: 1000 },
          { patch_timestamp: 2000 },
          { patch_timestamp: 3000 },
          { patch_timestamp: 4000 },
        ],
      },
    });

    await go();

    expect(displayTimeline).toHaveBeenCalledTimes(2);
    expect(displayPatchFound).toHaveBeenCalledTimes(1);
    expect(displayPatchNotFound).not.toHaveBeenCalled();
    expect(PlaySound).toHaveBeenCalledWith({}, expect.any(Function));
  });

  it("should display patch not found when there are not more patches than existing patches", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        patches: [
          { patch_timestamp: 1000 },
          { patch_timestamp: 2000 },
          { patch_timestamp: 3000 },
        ],
      },
    });

    await go();

    expect(displayTimeline).toHaveBeenCalledTimes(2);
    expect(displayPatchNotFound).toHaveBeenCalledTimes(1);
    expect(displayPatchFound).not.toHaveBeenCalled();
    expect(PlaySound).not.toHaveBeenCalled();
  });

  it("should display patch found when in test mode", async () => {
    process.env.test = "true";

    axios.get.mockResolvedValueOnce({
      data: {
        patches: [],
      },
    });

    await go();

    expect(displayTimeline).toHaveBeenCalledTimes(2);
    expect(displayPatchFound).toHaveBeenCalledTimes(1);
    expect(displayPatchNotFound).not.toHaveBeenCalled();
    expect(PlaySound).toHaveBeenCalledWith({}, expect.any(Function));

    delete process.env.test;
  });

  it("should handle errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Test error"));

    await go();

    expect(displayTimeline).toHaveBeenCalledTimes(1);
    expect(displayPatchNotFound).toHaveBeenCalledTimes(1);
    expect(displayPatchFound).not.toHaveBeenCalled();
    expect(PlaySound).not.toHaveBeenCalled();
  });
});
