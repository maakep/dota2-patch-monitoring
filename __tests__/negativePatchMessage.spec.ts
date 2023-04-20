import { negativePatchMessage } from "../src/index";

describe("negativePatchMessage function", () => {
  const messages = ["Message 1", "Message 2", "Message 3"];

  it("should return a string", () => {
    const result = negativePatchMessage(messages);
    expect(typeof result).toBe("string");
  });

  it("should return a message from the provided list", () => {
    const result = negativePatchMessage(messages);
    expect(messages).toContain(result);
  });

  it("should return a random message from the list", () => {
    const spy = jest.spyOn(Math, "random").mockReturnValue(0.5);
    const result = negativePatchMessage(messages);
    expect(result).toBe("Message 2");
    spy.mockRestore();
  });

  it("should return a default message when no negative messages are provided", () => {
    expect(negativePatchMessage()).toEqual("No new patch found.");
  });
});
