---
name: angular
description: Use this skill when writing or modifying Angular TypeScript in this repository. Prefer the Angular CLI MCP server for Angular documentation, best practices, workspace inspection, examples, and modernization guidance before relying on memory. Follow modern Angular 21 conventions and the patterns already used by the project.
---

# Angular Skill

## When to use

Use this skill only when the task involves Angular TypeScript code, especially:

- standalone components, component state, and lifecycle code
- services, dependency injection, RxJS integration, and Angular APIs
- directives, pipes, guards, route configuration, and typed Angular contracts
- Angular CLI or framework questions that directly affect the TypeScript implementation
- Angular Material or CDK usage from TypeScript

For visual/editorial page requirements, raw-content handling, project ingestion, or deployment infrastructure, use the dedicated skill instead.

## Workflow

1. Prefer the `angular-cli` MCP server for Angular-specific questions and operations.
2. Use MCP documentation and best-practices tools before answering from memory when Angular behavior is involved.
3. Keep TypeScript changes aligned with the existing workspace and current Angular 21 APIs.
4. Prefer standalone components and typed APIs; preserve the project's existing state, dependency-injection, and reactive patterns.

## Project context

- This repository uses Angular 21.x.
- `@angular/material` and `@angular/cdk` are installed.
- Keep Angular TypeScript changes consistent with the current workspace structure and existing contracts.

