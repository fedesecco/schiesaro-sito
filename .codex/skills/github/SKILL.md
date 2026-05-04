---
name: github
description: Use when work in this repository needs GitHub context or actions through the local GitHub MCP server configured in .codex/config.toml. Trigger for repository browsing, file lookup in remote repos, pull requests, issues, discussions, workflow runs, releases, commits, branches, or other GitHub API tasks.
---

# GitHub Skill

Use the local GitHub MCP server configured for this repository.

## Prerequisites

- Ensure Docker is installed and running.
- Ensure `GITHUB_PERSONAL_ACCESS_TOKEN` is set in the shell that launches Codex.
- Grant only the GitHub token scopes you actually need.

## Workflow

1. Prefer the GitHub MCP server over ad hoc browser steps when the task is about repositories, PRs, issues, workflows, releases, or remote file inspection.
2. Assume the server may not be available if Docker is stopped or the token is missing; in that case, surface the dependency clearly.
3. Keep repository mutations deliberate. For write operations such as creating or editing issues, PRs, comments, or releases, confirm the target details from the user request or the task context first.
4. Use local git and local files for this workspace when the task is about code already present in the repo; use GitHub MCP when remote GitHub state matters.

## Notes

- The MCP server is the official GitHub server image: `ghcr.io/github/github-mcp-server`.
- The token is intentionally not stored in the repo config.
- Optional enterprise host support can be added later with `GITHUB_HOST` if needed.
