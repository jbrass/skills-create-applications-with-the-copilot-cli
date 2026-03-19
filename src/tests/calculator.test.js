const { calculate, sqrt, runCli } = require("../calculator");

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

  test("computes modulo", () => {
    expect(calculate(10, "%", 3)).toBe(1);
    expect(calculate(7, "%", 2)).toBe(1);
    expect(calculate(9, "%", 3)).toBe(0);
  });

  test("computes exponentiation", () => {
    expect(calculate(2, "**", 10)).toBe(1024);
    expect(calculate(3, "**", 3)).toBe(27);
    expect(calculate(5, "**", 0)).toBe(1);
  });

  test("computes square root", () => {
    expect(sqrt(9)).toBe(3);
    expect(sqrt(4)).toBe(2);
    expect(sqrt(0)).toBe(0);
    expect(sqrt(2)).toBeCloseTo(1.4142, 4);
  });
});

describe("calculator edge cases", () => {
  test("throws on division by zero", () => {
    expect(() => calculate(10, "/", 0)).toThrow("division by zero is not allowed.");
  });

  test("throws on modulo by zero", () => {
    expect(() => calculate(10, "%", 0)).toThrow("modulo by zero is not allowed.");
  });

  test("throws on square root of negative number", () => {
    expect(() => sqrt(-1)).toThrow("square root of a negative number is not allowed.");
    expect(() => sqrt(-9)).toThrow("square root of a negative number is not allowed.");
  });

  test("throws on invalid number input for sqrt", () => {
    expect(() => sqrt(Number.NaN)).toThrow("value must be a valid number.");
  });

  test("throws on unsupported operator", () => {
    expect(() => calculate(10, "^", 2)).toThrow("unsupported operator. Use one of +, -, *, /, %, **.");
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
    expect(runCli(["10", "%", "3"])).toBe(1);
    expect(runCli(["2", "**", "10"])).toBe(1024);
  });

  test("runCli handles sqrt as unary operation", () => {
    expect(runCli(["sqrt", "9"])).toBe(3);
    expect(runCli(["sqrt", "4"])).toBe(2);
  });

  test("runCli throws on sqrt of negative number", () => {
    expect(() => runCli(["sqrt", "-1"])).toThrow("square root of a negative number is not allowed.");
  });

  test("runCli throws on wrong argument count", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number1> <operator> <number2>"
    );
  });
});
