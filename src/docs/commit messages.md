### Commit Types (Explanation → Example)

| **Type**      | **Explanation** | **Example** |
|---------------|----------------|-------------|
| **feat**      | Introduces a **new feature** for the user or API. | `feat: add endpoint for fetching daily foods` |
| **fix**       | Resolves a **bug** or incorrect behavior. | `fix: resolve duplicate food entries when updating day` |
| **refactor**  | Internal restructuring with **no behavior change**. | `refactor: simplify food validation logic` |
| **perf**      | Improves **performance** without altering behavior. | `perf: optimize query by adding index to foods collection` |
| **style**     | Purely **formatting or style** changes, no logic. | `style: format code with Prettier` |
| **docs**      | Documentation-only updates. | `docs: update API response examples` |
| **test**      | Adding or updating **tests**, no production code changes. | `test: add tests for day creation endpoint` |
| **build**     | Changes to **build system** or dependencies tooling. | `build: switch from npm to pnpm` |
| **ci**        | Changes to **CI/CD pipelines** or automation scripts. | `ci: add GitHub Actions workflow for tests` |
| **chore**     | Routine maintenance tasks that **don’t affect production logic**. | `chore: bump version to 1.3.0` |
| **revert**    | Reverts a previous commit. | `revert: revert "refactor: simplify food validation logic"` |
| **deps** *(optional)* | Adding, updating, or removing **dependencies**. | `deps: upgrade mongoose to v8` |
| **security** *(optional)* | Fixes **security issues** or vulnerabilities. | `security: patch XSS vulnerability in error handler` |

---

### Special Case: Non-Logic File Changes

If you **updated a diagram** or some **project meta-file** that isn't code or logic:

- **Use `docs`** – when the change is purely documentation-related (like architecture diagrams, README updates):
  ```bash
  docs: update microservice architecture diagram
