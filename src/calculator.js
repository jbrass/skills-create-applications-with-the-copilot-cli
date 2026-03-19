#!/usr/bin/env node

/**
 * Simple Node.js CLI calculator.
 *
 * Supported operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Exponentiation (^)
 * - Square root (sqrt)
 */

function modulo(a, b) {
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error("number1 and number2 must both be valid numbers.");
  }
  if (b === 0) {
    throw new Error("modulo by zero is not allowed.");
  }
  return a % b;
}

function power(base, exponent) {
  if (Number.isNaN(base) || Number.isNaN(exponent)) {
    throw new Error("number1 and number2 must both be valid numbers.");
  }
  return base ** exponent;
}

function squareRoot(n) {
  if (Number.isNaN(n)) {
    throw new Error("number1 and number2 must both be valid numbers.");
  }
  if (n < 0) {
    throw new Error("square root of a negative number is not allowed.");
  }
  return Math.sqrt(n);
}

function calculate(left, operator, right) {
  if (Number.isNaN(left) || Number.isNaN(right)) {
    throw new Error("number1 and number2 must both be valid numbers.");
  }

  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) {
        throw new Error("division by zero is not allowed.");
      }
      return left / right;
    case "%":
      return modulo(left, right);
    case "^":
      return power(left, right);
    case "sqrt":
      return squareRoot(left);
    default:
      throw new Error("unsupported operator. Use one of +, -, *, /, %, ^, sqrt.");
  }
}

function runCli(argv) {
  if (argv.length !== 3) {
    throw new Error("Usage: node src/calculator.js <number1> <operator> <number2>");
  }

  const [leftRaw, operator, rightRaw] = argv;
  const left = Number(leftRaw);
  const right = Number(rightRaw);
  return calculate(left, operator, right);
}

if (require.main === module) {
  try {
    const result = runCli(process.argv.slice(2));
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};
