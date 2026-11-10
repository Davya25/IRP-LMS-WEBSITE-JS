# IRP LMS – Responsive Web Design & Core JavaScript Foundations

> **Practical Assignment** | Frontend Development | Vanilla HTML5 · CSS3 · JavaScript

---

## 📋 Assignment Overview

This project is a two-part practical assignment that demonstrates:

- **Part A** – A fully responsive, semantic HTML5 + CSS3 clone of the IRP LMS Home Page.
- **Part B** – A standalone Node.js JavaScript program covering Types & Coercion, Scoping, and Hoisting.

No frameworks, libraries, or build tools are used. Pure HTML5, CSS3, and vanilla JavaScript only.

---

## 📁 Project Structure

```
irp-web-development-assignment/
│
├── part-a-responsive-ui/
│   ├── index.html          ← Semantic HTML5 home page
│   └── style.css           ← Responsive CSS3 stylesheet
│
├── part-b-javascript/
│   └── bank.js             ← Vanilla JavaScript (Node.js)
│
└── README.md               ← This file
```

---

## 🛠 Technologies Used

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 (Flexbox, Grid, Custom Properties, Media Queries) |
| Scripting | Vanilla JavaScript (ES6+), Node.js |
| Images | Cloudinary CDN (official IRP LMS assets) |
| Version Control | Git / GitHub |

---

## ✨ Part A – Features

### Design Tokens
Six CSS custom properties defined in `:root`:
- `--color-primary-navy: #003366`
- `--color-primary-orange: #FE781E`
- `--color-secondary-blue: #5F9FE0`
- `--color-bg-light: #E2F2FD`
- `--color-card-bg: #FFFFFF`
- `--color-border-light: #D6E9FF`

### Navigation Bar
- `position: sticky; top: 0; z-index: 1000` — anchored during scroll.
- Desktop (≥ 1024 px): Logo left · Home / Courses / Contact Us links · Sign In button.
- Mobile (≤ 768 px): Logo left · Sign In button right · nav links **hidden**.
- Active "Home" link has an orange underline indicator.

### Hero Section
- **Desktop** — Two-column Flexbox layout: text left, illustration right.
- **Mobile** — Stacks vertically; illustration scales proportionally.
- Kicker text, `clamp()`-sized heading, subtitle, and CTA button.
- Official climbing illustration from Cloudinary.

### Learning Journey
- Section heading + subtitle.
- **Five** step cards: Learn · Practice · Build Projects · Prepare · Get Placed.
- White background, `#D6E9FF` border, `10px` radius, `20px` padding.
- Orange step numbers, navy headings, hover lift + shadow.
- **Desktop**: `grid-template-columns: repeat(5, 1fr)`.
- **Tablet**: 3-column grid.
- **Mobile**: `grid-template-columns: 1fr` — single column.

### Footer
- Dark navy background with brand tagline, quick links, and contact info.

---

## 🔧 Part B – JavaScript Concepts Demonstrated

### Part 1 · Types & Coercion
- `parseAmount(input)` — robust validation function with descriptive errors.
- Tests for 15 distinct inputs (valid + invalid).
- Type coercion commentary: `"5" + 2`, `"5" - 2`, `typeof null`.

### Part 2 · Scoping & Hoisting
- `const` vs `let` — when and why to use each.
- **var hoisting** — logs `undefined` before the declaration line.
- **let Temporal Dead Zone** — catches `ReferenceError`.
- **Function declaration hoisting** — `announce()` called before its definition.
- **Function expression hoisting** — `notify()` catches `TypeError`.
- **Async loop bug** — `var` loop prints `3,3,3`; `let` loop prints `0,1,2`.

---

## ▶️ How to Run Part A

> **No installation required.**

1. Open the project folder.
2. Double-click `part-a-responsive-ui/index.html`, or right-click → **Open with → Google Chrome**.
3. The page loads immediately in the browser.

---

## ▶️ How to Run Part B

> **Requires Node.js** — download from [https://nodejs.org](https://nodejs.org) if not installed.

```bash
# From the project root:
node part-b-javascript/bank.js
```

Verify Node.js is installed:
```bash
node --version
```

---

## 📱 Responsive Testing Instructions

Open `part-a-responsive-ui/index.html` in **Google Chrome**, then press `F12` to open DevTools.

Click the **Toggle Device Toolbar** icon (📱) and test at each viewport:

| Viewport | Expected Layout |
|---|---|
| **375 px** | Single-column cards, stacked hero, logo + Sign In only |
| **390 px** | Same as 375 px |
| **768 px** | Transition point — mobile layout applies |
| **1024 px** | 3-column cards (tablet breakpoint) |
| **1200 px** | 5-column cards, two-column hero, full nav |
| **1440 px** | 5-column cards, two-column hero, full nav |

### Checklist
- [ ] Sticky navbar — stays at top while scrolling.
- [ ] Desktop nav links visible at ≥ 1024 px.
- [ ] Mobile nav links **hidden** at ≤ 768 px.
- [ ] Sign In button visible at all widths.
- [ ] Two-column hero on desktop.
- [ ] Single-column stacked hero on mobile.
- [ ] Exactly **five** learning journey cards.
- [ ] Five-column grid on desktop.
- [ ] Single-column cards on mobile.
- [ ] No horizontal scrollbar at any viewport.
- [ ] No broken or distorted images.

---

## 📊 Expected JavaScript Output (Part B)

```
=== parseAmount Tests ===

"500"      -> 500
" 250 "    -> 250
100        -> 100
"12.5"     -> 12.5
""         Error: Amount cannot be an empty string.
"abc"      Error: Cannot convert "abc" to a valid number.
null       Error: Amount is required. Received: null
undefined  Error: Amount is required. Received: undefined
"12.5.3"   Error: Cannot convert "12.5.3" to a valid number.
0          Error: Amount must be greater than zero. Received: 0
-50        Error: Amount must be greater than zero. Received: -50
"0"        Error: Amount must be greater than zero. Received: 0
"Infinity" Error: Amount must be a finite number. Received: Infinity
true       Error: Invalid input type. Expected a string or number, but received: boolean
[]         Error: Invalid input type. Expected a string or number, but received: object

=== Type Coercion Demonstrations ===

"5" + 2  = 52
"5" - 2  = 3
typeof null = object

=== PART 2: Scoping & Hoisting ===

Bank name: JS National Bank
Transaction count: 2

--- A. var Hoisting ---
varHoistDemo before declaration: undefined
varHoistDemo after declaration: I was declared with var

--- B. let Temporal Dead Zone (TDZ) ---
TDZ ReferenceError caught: Cannot access 'letTDZDemo' before initialization

--- C. Function Declaration Hoisting ---
announce() called before its definition – function declarations are fully hoisted!

--- D. Function Expression Hoisting ---
Function expression TypeError caught: notify is not a function
notify() was called successfully.

--- var loop (expected: 3, 3, 3) ---
var loop: 3
var loop: 3
var loop: 3

--- let loop (expected: 0, 1, 2) ---
let loop: 0
let loop: 1
let loop: 2
```

---

## 🚀 GitHub Submission Instructions

### Step 1 – Create a GitHub repository
1. Go to [https://github.com](https://github.com) and log in.
2. Click **+** → **New repository**.
3. Set the repository name to: `irp-web-development-assignment`
4. Set visibility to **Public**.
5. Do **not** initialise with a README (you already have one).
6. Click **Create repository**.

### Step 2 – Push from your local machine

Open a terminal inside the project root folder and run:

```bash
git init
git add .
git commit -m "Complete IRP LMS web development assignment"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

> Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL shown on your new GitHub repository page (e.g. `https://github.com/your-username/irp-web-development-assignment.git`).

### Step 3 – Verify submission
1. Open an **incognito/private** browser window.
2. Navigate to `https://github.com/your-username/irp-web-development-assignment`.
3. Confirm all three files and the README are visible publicly.

---

## 👨‍💻 Author

Built as part of the **IRP LMS Web Development Practical Assignment**.

---

*© 2024 IRP LMS. All rights reserved.*
