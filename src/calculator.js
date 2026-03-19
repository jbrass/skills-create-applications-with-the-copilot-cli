#!/usr/bin/env node

/**
 * Simple Node.js CLI calculator.
 *
 * Supported operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

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
    default:
      throw new Error("unsupported operator. Use one of +, -, *, /.");
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
  calculate,
  runCli,
};
