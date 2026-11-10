"use strict";

// ================================================================
// PART 1: Types & Coercion
// ================================================================

/**
 * parseAmount(input)
 * Validates a raw user input and returns a positive finite number.
 * Throws a descriptive Error for every invalid input.
 *
 * Rules (in order):
 *  1. null / undefined  → throw "amount is required"
 *  2. not string/number → throw "invalid type"
 *  3. string: trim()   → throw if empty string
 *  4. Number()          → throw if NaN
 *  5. not finite        → throw (rejects "Infinity")
 *  6. <= 0              → throw "must be greater than zero"
 *  7. valid             → return the number
 */
function parseAmount(input) {

  // Rule 1 – null and undefined must be caught before anything else
  // because typeof null === "object" and would pass the type check below
  if (input === null || input === undefined) {
    throw new Error("Amount is required. Received: " + input);
  }

  // Rule 2 – only strings and numbers are accepted as raw user input;
  // booleans, arrays, objects, etc. are rejected immediately
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error(
      "Invalid input type. Expected a string or number, but got: " + typeof input
    );
  }

  // Rule 3 – trim whitespace from strings before converting
  let trimmed = input;
  if (typeof input === "string") {
    trimmed = input.trim();
    // Guard: Number("") coerces to 0, which we must reject explicitly
    if (trimmed === "") {
      throw new Error(
        'Amount cannot be an empty string. ' +
        'Note: Number("") === 0, which is not a valid amount.'
      );
    }
  }

  // Rule 4 – attempt numeric conversion; NaN means the string was non-numeric
  const amount = Number(trimmed);
  if (Number.isNaN(amount)) {
    throw new Error('Cannot convert "' + trimmed + '" to a valid number (got NaN).');
  }

  // Rule 5 – reject Infinity / -Infinity (Number("Infinity") is Infinity)
  if (!Number.isFinite(amount)) {
    throw new Error(
      "Amount must be a finite number. Received: " + amount
    );
  }

  // Rule 6 – amounts must be positive
  if (amount <= 0) {
    throw new Error(
      "Amount must be greater than zero. Received: " + amount
    );
  }

  // All rules passed – return the validated number
  return amount;
}

// ----------------------------------------------------------------
// Testing parseAmount() – each input in its own try / catch block
// ----------------------------------------------------------------

console.log("=== parseAmount() Tests ===\n");

// --- Valid inputs (should return a number) ---

// "500" → string containing a whole number → 500
try {
  console.log('"500"      ->', parseAmount("500"));
} catch (e) {
  console.log('"500"      Error:', e.message);
}

// " 250 " → padded string; trim() removes spaces → 250
try {
  console.log('" 250 "    ->', parseAmount(" 250 "));
} catch (e) {
  console.log('" 250 " Error:', e.message);
}

// --- Invalid inputs (should throw and be caught) ---

// "" → empty string; Number("") === 0 so we guard against it first
try {
  console.log('""         ->', parseAmount(""));
} catch (e) {
  console.log('""         Error:', e.message);
}

// "abc" → Number("abc") is NaN
try {
  console.log('"abc"      ->', parseAmount("abc"));
} catch (e) {
  console.log('"abc"      Error:', e.message);
}

// null → input is required; also, Number(null) === 0 so must be caught first
try {
  console.log('null       ->', parseAmount(null));
} catch (e) {
  console.log('null       Error:', e.message);
}

// undefined → input is required; Number(undefined) is NaN
try {
  console.log('undefined  ->', parseAmount(undefined));
} catch (e) {
  console.log('undefined  Error:', e.message);
}

// "12.5.3" → two decimal points; Number("12.5.3") is NaN
try {
  console.log('"12.5.3"   ->', parseAmount("12.5.3"));
} catch (e) {
  console.log('"12.5.3"   Error:', e.message);
}

console.log(); // blank line for readability

// --- Extra edge-case tests ---

// 100 → plain number type, valid
try {
  console.log('100        ->', parseAmount(100));
} catch (e) {
  console.log('100        Error:', e.message);
}

// 0 → zero is not greater than zero
try {
  console.log('0          ->', parseAmount(0));
} catch (e) {
  console.log('0          Error:', e.message);
}

// -50 → negative amounts are rejected
try {
  console.log('-50        ->', parseAmount(-50));
} catch (e) {
  console.log('-50        Error:', e.message);
}

// "0" → string "0" converts to 0, which is not > 0
try {
  console.log('"0"        ->', parseAmount("0"));
} catch (e) {
  console.log('"0"        Error:', e.message);
}

// "Infinity" → Number("Infinity") is Infinity, not finite
try {
  console.log('"Infinity" ->', parseAmount("Infinity"));
} catch (e) {
  console.log('"Infinity" Error:', e.message);
}

// true → boolean type is rejected (not string or number)
try {
  console.log('true       ->', parseAmount(true));
} catch (e) {
  console.log('true       Error:', e.message);
}

// [] → object type is rejected
try {
  console.log('[]         ->', parseAmount([]));
} catch (e) {
  console.log('[]         Error:', e.message);
}

// ----------------------------------------------------------------
// Mandatory Type Coercion Comments & Demonstrations
// ----------------------------------------------------------------

console.log("\n=== Type Coercion Demonstrations ===\n");

// WHY "5" + 2 gives "52":
// The + operator is overloaded. When EITHER operand is a string,
// JavaScript converts the other operand to a string as well and
// performs string concatenation rather than numeric addition.
// So "5" + 2 → "5" + "2" → "52"  (not 7!)
// This is the exact bug described in the bank scenario.
console.log('"5" + 2  =', "5" + 2);    // 52  (string "52")

// WHY "5" - 2 gives 3:
// The - operator has NO string-concatenation mode.
// JavaScript always coerces both operands to numbers before subtracting.
// Number("5") is 5, so "5" - 2 → 5 - 2 → 3
console.log('"5" - 2  =', "5" - 2);    // 3   (number 3)

// WHY typeof null === "object":
// This is a historical quirk baked into JavaScript from its first version.
// In the original V8-predecessor engine, all values were stored with a
// low-bit type tag; the tag for objects was 0, and the null pointer
// (0x00000000) also started with 0, so null was (incorrectly) reported
// as "object". The spec now documents this as a bug that cannot be fixed
// without breaking existing websites. null is NOT an object — it means
// the intentional absence of any object reference.
console.log('typeof null =', typeof null); // "object"


// ================================================================
// PART 2: Scoping & Hoisting
// ================================================================

console.log("\n=== PART 2: Scoping & Hoisting ===\n");

// ----------------------------------------------------------------
// STEP 1: Main Declarations
// ----------------------------------------------------------------

// const is used for BANK_NAME because a bank's name is a constant —
// it must NEVER be reassigned. Any attempt throws a TypeError at runtime.
const BANK_NAME = "JS National Bank";

// let is used for transactionCounter because its value increments
// with every transaction — it must be reassignable over time.
let transactionCounter = 0;

transactionCounter++; // first transaction
transactionCounter++; // second transaction

console.log("Bank name        :", BANK_NAME);          // JS National Bank
console.log("Transaction count:", transactionCounter); // 2

// ----------------------------------------------------------------
// STEP 2: Hoisting Demo
// ----------------------------------------------------------------

// HOISTING DEMO
//
// JavaScript engines process a script in TWO phases:
//
//   CREATION PHASE (before any code runs)
//   ───────────────────────────────────────
//   • var declarations are hoisted to the top of their function/global
//     scope and initialized to `undefined`.
//   • Function DECLARATIONS are hoisted in full (name + body).
//   • let / const declarations are hoisted but placed in the
//     "Temporal Dead Zone" (TDZ) — accessing them before their
//     declaration line throws a ReferenceError.
//
//   EXECUTION PHASE (top-to-bottom)
//   ─────────────────────────────────
//   • Assignments, function calls, and all other statements run here.

console.log("\n--- A. var Hoisting ---");
// A. var hoisting
// During the CREATION PHASE, `varDemo` is hoisted and set to undefined.
// Therefore reading it here (before the declaration line) prints undefined
// instead of throwing a ReferenceError.
console.log("varDemo before declaration:", varDemo); // undefined
var varDemo = "I was declared with var";
console.log("varDemo after  declaration:", varDemo);

console.log("\n--- B. let Temporal Dead Zone (TDZ) ---");
// B. let TDZ
// `letDemo` is hoisted but NOT initialized until the `let` line is reached.
// Accessing it inside the TDZ throws a ReferenceError — caught here.
try {
  console.log("letDemo:", letDemo); // throws before this prints
} catch (e) {
  console.log("TDZ ReferenceError caught:", e.message);
}
let letDemo = "I was declared with let";

console.log("\n--- C. Function Declaration Hoisting ---");
// C. Function declarations are FULLY hoisted (name + body).
// Calling announce() here, before its definition in the source, works fine.
announce();

function announce() {
  console.log(
    "announce() succeeded — function declarations are fully hoisted!"
  );
}

console.log("\n--- D. Function Expression Hoisting ---");
// D. Function expression hoisting
// `var notify` is hoisted and initialized to undefined (CREATION PHASE).
// The assignment `notify = function() {}` only happens at runtime.
// Calling notify() before the assignment means we're calling undefined(),
// which throws a TypeError — caught below.
try {
  notify(); // notify is undefined here → TypeError: notify is not a function
} catch (e) {
  console.log("Function expression TypeError caught:", e.message);
}
var notify = function () {
  console.log("notify() called after its assignment — works correctly.");
};
notify(); // Now the assignment has run → works fine

// ----------------------------------------------------------------
// STEP 3: Asynchronous Loop Bug — var vs let
// ----------------------------------------------------------------

// A. var loop
// var is function-scoped (global scope here), so ALL three setTimeout
// callbacks share the SAME single `i` variable. By the time the event
// loop executes the callbacks (after 100 ms), the for-loop has already
// finished and `i` is 3 for every callback. Output: 3, 3, 3.
console.log("\n--- var loop (expected: 3, 3, 3) ---");
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 100);
}

// B. let loop
// let is BLOCK-SCOPED. Each iteration of the for-loop creates a fresh,
// independent binding of `i` that is captured by that iteration's closure.
// So each callback remembers its own value: 0, 1, 2. Output: 0, 1, 2.
console.log("--- let loop (expected: 0, 1, 2) ---");
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 100);
}

// Both loops use the same 100 ms delay, so their async output interleaves
// after the synchronous code finishes. The var loop always prints 3, 3, 3
// because var shares one binding; the let loop correctly prints 0, 1, 2
// because let gives each iteration its own lexical binding.
