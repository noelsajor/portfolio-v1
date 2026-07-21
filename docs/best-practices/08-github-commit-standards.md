# 08 - GitHub & Commit Standards

This playbook defines how we manage source control and collaborate.

## 🌿 Branch Naming
Follow the type prefix convention:
- `feat/`: New features or major components.
- `fix/`: Bug fixes.
- `docs/`: Documentation updates.
- `chore/`: Maintenance, dependency updates, configuration.
- `refactor/`: Code improvements without functional changes.

Example: `feat/contact-form-honeypot`

## 💬 Conventional Commits
All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

**Format**: `<type>(scope): <description>`
- **feat**: A new feature for the user, not a new feature for builds or tests.
- **fix**: A bug fix for the user, not a fix for builds or tests.
- **docs**: Changes to the documentation.
- **style**: Formatting, missing semi colons, etc; no production code change.
- **refactor**: Refactoring production code, e.g. renaming a variable.
- **chore**: Updating grunt tasks etc; no production code change.

## 🚢 Pull Requests & Merging
- **Code Reviews**: Every PR requires at least one approval.
- **Atomic PRs**: Keep PRs small and focused on a single logical change.
- **Fast-Forward**: Prefer rebase over merge to keep history clean.
- **Labels**: Every PR should be labeled (e.g., `priority: high`, `status: in-review`).

## 📦 Releases & Versioning
- Use **Semantic Versioning** (SemVer).
- Tag production releases on GitHub.
