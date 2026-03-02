---
phase: 04-agentic-intake-agent
plan: "01"
subsystem: intake-agent-foundation
tags: [ai-sdk, vercel-ai, tool-calling, model-routing, types, crm-orchestration]
dependency_graph:
  requires: [lib/pricing/calculator.ts, lib/pricing/tier-selector.ts, lib/integrations/catalog.ts, lib/pricing/types.ts]
  provides: [lib/intake/types.ts, lib/intake/model.ts, lib/intake/tools.ts]
  affects: [app/api/intake/chat/route.ts, app/(marketing)/get-started/page.tsx, supabase/functions/generate-proposal, supabase/functions/send-proposal-email]
tech_stack:
  added: [ai@6.0.107, "@ai-sdk/anthropic@3.0.52", "@ai-sdk/openai@3.0.39", "zod@4.3.6", "@react-pdf/renderer@4.3.2"]
  patterns: [Vercel AI SDK tool() with inputSchema, MODEL_PROVIDER env routing, single-orchestration saveToCRM]
key_files:
  created:
    - lib/intake/types.ts
    - lib/intake/model.ts
    - lib/intake/tools.ts
  modified:
    - package.json
decisions:
  - "ai@6 uses inputSchema (not parameters) in tool() — fixed to match actual @ai-sdk/provider-utils API"
  - "ai@6 uses LanguageModel (not LanguageModelV1) — model.ts updated to import correct type"
  - "execute() in ai@6 receives (input, options) not destructured params — all tools refactored"
  - "saveToCRMTool is the single orchestration point for generate-proposal → send-proposal-email → CRM webhook"
metrics:
  duration: "5 min"
  completed_date: "2026-03-02"
  tasks_completed: 3
  files_created: 3
  files_modified: 1
---

# Phase 4 Plan 01: Agentic Intake Agent Foundation Summary

**One-liner:** Vercel AI SDK v6 tool layer with MODEL_PROVIDER routing and single-orchestration saveToCRM delivery chain for the intake agent.

## What Was Built

Installed the five packages required for Phase 4 (ai@6, @ai-sdk/anthropic, @ai-sdk/openai, zod, @react-pdf/renderer) and created the three foundational `lib/intake/` files that all downstream Phase 4 plans depend on.

### lib/intake/types.ts
Three shared TypeScript interfaces:
- `ProspectData` — collects name, email, industry, platform, locationCount, monthlyLeads, goals, platformTier, legacyPath, rawTools
- `ProposalLineItem` — extends IntegrationSelection with setupCost, monthlyCost, included flag
- `ProposalData` — full proposal shape for PDF generation, Supabase insert, and CRM webhook

### lib/intake/model.ts
Single function `getIntakeModel()` that reads `process.env.MODEL_PROVIDER` at runtime:
- `MODEL_PROVIDER=openai` → `gpt-4o`
- `MODEL_PROVIDER=anthropic` (or unset) → `claude-sonnet-4-5-20251001`
- No provider is hardcoded anywhere (INTAKE-09 compliant)

### lib/intake/tools.ts
Five tool definitions using Vercel AI SDK `tool()` + zod schemas, exported as `intakeTools`:
1. **lookupIntegrationTool** — catalog lookup, returns tier/costs or null
2. **detectPlatformTierTool** — classifies platform as legacy/full/migration
3. **calculateProposalTool** — calls selectTier + calculatePricing, returns full pricing result
4. **generateProposalPDFTool** — calls `/api/intake/pdf` route (implemented in Plan 05)
5. **saveToCRMTool** — single orchestration point: generate-proposal edge fn (INTAKE-05) → send-proposal-email edge fn (INTAKE-06) → CRM webhook (INTAKE-07)

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1: Install packages | 424c9f1 | chore(04-01): install Vercel AI SDK and proposal generation packages |
| Task 2: types.ts | b943e2b | feat(04-01): add lib/intake/types.ts — shared proposal and prospect contracts |
| Task 3: model.ts + tools.ts | 1c4a5e2 | feat(04-01): add lib/intake/model.ts and lib/intake/tools.ts |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ai@6 API change: parameters → inputSchema, LanguageModelV1 → LanguageModel**
- **Found during:** Task 3 TypeScript check
- **Issue:** The plan was authored for ai@5 API. ai@6 changed the `tool()` function to use `inputSchema` instead of `parameters`, the `execute` function now receives `(input, options)` instead of destructured params, and `LanguageModelV1` was renamed to `LanguageModel`
- **Fix:** Updated `model.ts` to import `LanguageModel`. Updated all 5 tool definitions in `tools.ts` to use `inputSchema` and access values via `input.fieldName` pattern
- **Files modified:** lib/intake/model.ts, lib/intake/tools.ts
- **Commit:** 1c4a5e2 (same commit — fix applied before commit)

## Key Decisions

1. **ai@6 inputSchema API** — Vercel AI SDK v6 renamed `parameters` to `inputSchema` in the `Tool` type definition from `@ai-sdk/provider-utils`. The `execute` function now receives `(input: INPUT, options: ToolExecutionOptions)` instead of destructured arguments. Updated all tools to match.

2. **saveToCRM as single orchestration point** — All proposal side effects (Supabase persistence, email, CRM webhook) live inside `saveToCRMTool.execute`. This prevents the missing-fields bug where `onFinish` callbacks have no access to prospect data from tool calls.

3. **Graceful degradation** — saveToCRM handles missing env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ASC_CRM_WEBHOOK_URL) with console.warn and continues rather than throwing, so local dev without these vars doesn't crash the agent.

## Self-Check: PASSED

- FOUND: lib/intake/types.ts
- FOUND: lib/intake/model.ts
- FOUND: lib/intake/tools.ts
- FOUND: .planning/phases/04-agentic-intake-agent/04-01-SUMMARY.md
- FOUND: commit 424c9f1 (package installs)
- FOUND: commit b943e2b (types.ts)
- FOUND: commit 1c4a5e2 (model.ts + tools.ts)
