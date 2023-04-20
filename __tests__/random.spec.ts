import { random } from "../src/index";

describe("random function", () => {
  it("should return a random element from the given list", () => {
    const list = [1, 2, 3, 4, 5];
    const result = random(list);
    expect(list).toContain(result);
  });

  it("should return undefined when given an empty list", () => {
    const result = random([]);
    expect(result).toBeUndefined();
  });

  it("should return the only element when given a list with one element", () => {
    const list = ["one"];
    const result = random(list);
    expect(result).toBe("one");
  });
});
