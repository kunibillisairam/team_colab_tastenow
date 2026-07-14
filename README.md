# FeastFlow — Art of Modern Fine Dining

FeastFlow is a premium, high-end food and restaurant website built to practice collaborative frontend development. This project implements a modern, single-page homepage with premium aesthetics, fluid layouts, glassmorphic headers, and custom interactions.

---

## 📂 Project Structure

- `index.html` — Main document containing the semantic layout for all 8 homepage sections.
- `style.css` — Modern design system using variables, flexible CSS Grid/Flexbox, custom animations, and responsive breakpoints.
- `products.js` — Global database of gourmet dishes. Allows easy updates to menu items.
- `app.js` — Interactive logic (mobile menu toggle, scrollspy active nav link indicator, staggered product rendering, category filters, review slider, and form validation).
- `/assets/` — Directory containing generated high-resolution assets (like the hero dish image).

---

## 🛠️ Getting Started

To run the project locally:
1. Clone the repository to your local machine.
2. Open the project folder.
3. Open `index.html` in any web browser (simply double-click the file, or use a local development server extension like **Live Server** in VS Code).

---

## 🤝 Collaborative Git Workflow Guidelines

To collaborate smoothly with your team, follow these guidelines:

### 1. Maintain a Clean Main Branch
* Do not commit code directly to the `main` branch.
* Keep `main` as the stable production version of the project.

### 2. Feature Branching
Create a separate branch for every feature or task you work on. Use clear naming conventions:
```bash
# Example branches
git checkout -b feature/ui-polishing
git checkout -b feature/cart-management
git checkout -b feature/order-checkout
```

### 3. Open Pull Requests (PRs)
* When you finish a feature, push your branch to GitHub.
* Open a Pull Request from your branch into `main`.
* Tag your teammates to review your changes.
* Once at least one teammate approves the changes and tests them locally, the PR can be safely merged.

### 4. Resolving Merge Conflicts
If you and a teammate edit the same files (like `style.css` or `index.html`), Git might flag a conflict. To resolve:
1. Pull the latest `main` branch into your feature branch:
   ```bash
   git checkout feature/your-branch
   git pull origin main
   ```
2. Open the conflicting files. Look for the markers:
   ```
   <<<<<<< HEAD
   (your changes)
   =======
   (incoming changes from main)
   >>>>>>> main
   ```
3. Discuss with your teammate, decide which code to keep, delete the conflict markers, save the file, and commit.

---

## 👥 Suggested Roles & Collaboration Division

* **Teammate A (UI Layout & Styling):** Focuses on improving responsiveness, implementing custom animations, styling buttons, and fine-tuning headers and footers.
* **Teammate B (Products & Filtering):** Updates or expands the product list in `products.js`, works on refining catalog filtering speed, and manages dish card styling.
* **Teammate C (Interactive Forms & Sliders):** Optimizes form validation, adjusts slider timers/effects, and implements the table reservation confirmation flows.
