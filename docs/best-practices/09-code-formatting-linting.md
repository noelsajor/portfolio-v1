# 09 - Code Formatting & Linting

This playbook defines the static analysis and styling rules for the codebase.

## 🛠️ Tooling
- **Prettier**: For automated code formatting.
- **ESLint**: For logical and best-practice enforcement.

## 📏 Indentation & Style
- **Indentation**: 2 spaces.
- **Quotes**: Single quotes preferred for strings.
- **Semi-colons**: Required for line termination.
- **Trailing Commas**: Always use trailing commas in arrays and objects for cleaner diffs.

## 🚫 No-Go Patterns
- **No Console Logs**: Remove all `console.log` statements before merging to production.
- **No Any**: Avoid `any` in TypeScript; use `unknown` or define an interface.
- **No Comments for Code**: Write self-documenting code. Use comments only for "Why", not "What".
- **Dead Code**: Remove unused imports, variables, and components immediately.

## 🏃 Pre-commit Hooks
- All projects SHOULD use `husky` and `lint-staged` to run ESLint and Prettier before a commit is finalized.
- If a build fails the lint check, the commit must be blocked until resolved.

## 🧹 Housekeeping
- Keep dependencies updated using `npm outdated` or Dependabot.
- Regularly audit for unused NPM packages and remove them to keep bundle sizes lean.
