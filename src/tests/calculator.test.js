const { modulo, power, squareRoot, calculate, runCli } = require("../calculator");

describe("calculator operations", () => {
  test("calculates modulo with 5 % 2 from extended operations example", () => {
    expect(modulo(5, 2)).toBe(1);
    expect(calculate(5, "%", 2)).toBe(1);
    expect(runCli(["5", "%", "2"])).toBe(1);
  });

  test("calculates modulo", () => {
    expect(modulo(10, 3)).toBe(1);
    expect(calculate(10, "%", 3)).toBe(1);
  });

  test("calculates power with 2 ^ 3 from extended operations example", () => {
    expect(power(2, 3)).toBe(8);
    expect(calculate(2, "^", 3)).toBe(8);
    expect(runCli(["2", "^", "3"])).toBe(8);
  });

  test("calculates power", () => {
    expect(power(2, 3)).toBe(8);
    expect(calculate(2, "^", 3)).toBe(8);
  });

  test("calculates square root with sqrt(16) from extended operations example", () => {
    expect(squareRoot(16)).toBe(4);
    expect(calculate(16, "sqrt", 0)).toBe(4);
    expect(runCli(["16", "sqrt", "0"])).toBe(4);
  });

  test("calculates square root", () => {
    expect(squareRoot(25)).toBe(5);
    expect(calculate(25, "sqrt", 0)).toBe(5);
  });

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
  test("throws on modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("modulo by zero is not allowed.");
    expect(() => calculate(10, "%", 0)).toThrow("modulo by zero is not allowed.");
  });

  test("handles power edge cases", () => {
    expect(power(2, 0)).toBe(1);
    expect(power(2, -2)).toBe(0.25);
    expect(calculate(2, "^", -2)).toBe(0.25);
  });

  test("throws on square root of negative number", () => {
    expect(() => squareRoot(-1)).toThrow("square root of a negative number is not allowed.");
    expect(() => calculate(-1, "sqrt", 0)).toThrow(
      "square root of a negative number is not allowed."
    );
  });

  test("throws on division by zero", () => {
    expect(() => calculate(10, "/", 0)).toThrow("division by zero is not allowed.");
  });

  test("throws on unsupported operator", () => {
    expect(() => calculate(10, "noop", 2)).toThrow(
      "unsupported operator. Use one of +, -, *, /, %, ^, sqrt."
    );
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
    expect(runCli(["2", "^", "3"])).toBe(8);
    expect(runCli(["25", "sqrt", "0"])).toBe(5);
  });

  test("runCli throws on wrong argument count", () => {
    expect(() => runCli(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number1> <operator> <number2>"
    );
  });
});
