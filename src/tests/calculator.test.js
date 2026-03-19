const { calculate, runCli } = require("../calculator");

describe("calculator operations", () => {
  test("adds numbers", () => {
    expect(calculate(2, "+", 3)).toBe(5);
    expect(calculate(-5, "+", 2)).toBe(-3);
  });

  test("subtracts numbers", () => {
    expect(calculate(10, "-", 4)).toBe(6);
    expect(calculate(4, "-", 10)).toBe(-6);
  });

  test("multiplies numbers", () => {
    expect(calculate(45, "*", 2)).toBe(90);
    expect(calculate(-3, "*", 6)).toBe(-18);
  });

  test("divides numbers", () => {
    expect(calculate(20, "/", 5)).toBe(4);
    expect(calculate(7, "/", 2)).toBe(3.5);
  });
});

describe("calculator edge cases", () => {
  test("throws on division by zero", () => {
    expect(() => calculate(10, "/", 0)).toThrow("division by zero is not allowed.");
  });

  test("throws on unsupported operator", () => {
    expect(() => calculate(10, "^", 2)).toThrow("unsupported operator. Use one of +, -, *, /.");
  });

  test("throws on invalid number input", () => {
    expect(() => calculate(Number.NaN, "+", 2)).toThrow(
      "number1 and number2 must both be valid numbers."
    );
    expect(() => calculate(2, "+", Number.NaN)).toThrow(
      "number1 and number2 must both be valid numbers."
    );
  });

  test("runCli parses numeric args and computes result", () => {
    expect(runCli(["2", "+", "3"])).toBe(5);
    expect(runCli(["10", "-", "4"])).toBe(6);
    expect(runCli(["45", "*", "2"])).toBe(90);
    expect(runCli(["20", "/", "5"])).toBe(4);
  });

  test("runCli throws on wrong argument count", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number1> <operator> <number2>"
    );
  });
});
