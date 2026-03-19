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
 * - Exponentiation (**)
 * - Square root (sqrt) — unary: node src/calculator.js sqrt <number>
 */

function sqrt(value) {
  if (Number.isNaN(value)) {
    throw new Error("value must be a valid number.");
  }
  if (value < 0) {
    throw new Error("square root of a negative number is not allowed.");
  }
  return Math.sqrt(value);
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
      if (right === 0) {
        throw new Error("modulo by zero is not allowed.");
      }
      return left % right;
    case "**":
      return left ** right;
    default:
      throw new Error("unsupported operator. Use one of +, -, *, /, %, **.");
  }
}

const USAGE =
  "Usage: node src/calculator.js <number1> <operator> <number2>\n" +
  "       node src/calculator.js sqrt <number>";

function runCli(argv) {
  // Unary sqrt: node src/calculator.js sqrt <number>
  if (argv[0] === "sqrt") {
    if (argv.length !== 2) {
      throw new Error(USAGE);
    }
    const value = Number(argv[1]);
    return sqrt(value);
  }

  if (argv.length !== 3) {
    throw new Error(USAGE);
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
  sqrt,
  runCli,
};
