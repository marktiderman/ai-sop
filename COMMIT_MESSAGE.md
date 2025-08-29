🛠️ Fix all CodeRabbit issues: Security, robustness, and code quality improvements

This comprehensive commit addresses all CodeRabbit feedback with the following fixes:

## Security & Data Integrity
- **ID Sanitization**: Added filesystem-safe session ID handling to prevent path traversal attacks
- **Context Type Safety**: Changed all `Record<string, any>` to `Record<string, unknown>` for better type safety
- **Metadata Protection**: Fixed CLI to properly access session metadata instead of undefined properties

## Storage Backend Compliance  
- **Conditional FS Operations**: Added `useFs` flag to respect storage backend configuration
- **Memory Mode Support**: Filesystem operations now skip when using memory backend
- **Type Consistency**: Removed unsupported 'database' option from storageBackend union

## UUID Implementation
- **Collision-Safe IDs**: Replaced `Date.now()` with `randomUUID()` for all record IDs
- **Decision Logs**: Use UUID for decision.id instead of timestamp-based IDs
- **Phase Transitions**: Use UUID for transition.id for uniqueness under concurrency
- **PB&J Checkpoints**: Use UUID for checkpoint.id to prevent collisions

## Performance Optimizations
- **Eliminated Double Saves**: Fixed redundant saveSession() calls in PB&J checkpoints
- **Efficient I/O**: Only persist to disk when filesystem backend is enabled
- **Type-Safe Phase Distribution**: Use `Partial<Record<PhaseId, number>>` for better typing

## CLI Improvements
- **Public API**: Added `getAllSessions()` method to replace private property access
- **Metadata Access**: Fixed CLI to read gitBranch/issueNumber from session.metadata
- **Package Scripts**: Fixed start script path and removed redundant builds

## Bundling & Configuration
- **Browser-Safe Exports**: Moved DashboardServer to separate `src/node.ts` entry point
- **ESLint Configuration**: Added `.eslintrc.cjs` to fix CI linting failures
- **Clean Repository**: Removed test session artifacts from version control

## Type Safety Enhancements
- **PhaseId Union**: Strong typing prevents phantom phase references
- **Dashboard Stats**: Typed phase distribution with PhaseId keys
- **Method Signatures**: Updated all context parameters to use unknown type

All changes maintain backward compatibility while significantly improving security,
robustness, and maintainability of the phase tracking system.