# Repository Improvement Issues

The following issues were identified during review and should be opened in the repository's issue tracker. Each issue should be assigned to **@coderabbitai**.

## 1. Align documentation with current `src/` layout
- **Problem**: Multiple files still reference an outdated `aisop-system/` directory even though configuration lives in `src/`.
- **Scope**:
  - Replace `aisop-system/` path references with `src/`.
  - Clarify versioning differences (config 1.0.0 vs package 1.2.2).
  - Update any related instructions or SOP paths.
- **Acceptance Criteria**:
  - All docs & SOPs point to correct `src/` locations.
  - Version notes clarified where applicable.

## 2. Fix missing `test-override-system.cjs` trigger
- **Problem**: `agents.md` instructs running `node test-override-system.cjs`, but the script is absent and execution fails.
- **Scope**:
  - Either add a functional `test-override-system.cjs` script.
  - Or remove/replace the instruction in `agents.md` and any SOPs.
- **Acceptance Criteria**:
  - Trigger command in `agents.md` runs successfully or is removed.
  - Documentation reflects the final behavior.

## 3. Create a Day-1 onboarding guide & quick-start references
- **Problem**: New contributors face steep learning curves due to lengthy SOPs and unclear first steps.
- **Scope**:
  - Concise “Day‑1” guide covering project architecture and values.
  - PB&J‑style summaries of major SOPs.
  - Example workflow (issue → branch → commits → PR).
  - Sample Lighthouse Protocol issue filled out for reference.
- **Acceptance Criteria**:
  - New agents can follow guide to complete a sample work cycle.
  - SOP summaries referenced from guide.
  - Example lighthouse issue available in repo or documentation.

## 4. Leadership dashboard/CLI for phase tracking
- **Problem**: Constitution calls for phase awareness, but there’s no tool to track agent phases or decision logs.
- **Scope**:
  - Prototype a dashboard or CLI to log current phase, decisions, PB&J checkpoints.
  - Explore integration with existing work-cycle protocols.
- **Acceptance Criteria**:
  - Demo tool displaying phase transitions and decision logs.
  - Documentation on how to run and interpret the dashboard/CLI.

## 5. Publish a short-term project roadmap
- **Problem**: Contributors lack visibility into near-term priorities.
- **Scope**:
  - Draft roadmap outlining the next few milestones (e.g., dashboard prototype, override test script, unified naming).
  - Include timelines or target release phases.
- **Acceptance Criteria**:
  - Roadmap published in repository or project wiki.
  - Linked from README or CONTRIBUTING guide for easy discovery.

