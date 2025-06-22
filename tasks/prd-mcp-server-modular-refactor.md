# Product Requirements Document: MCP Server Modular Architecture Refactor

## Introduction/Overview

This document outlines the requirements for refactoring the existing Penguin Bank MCP server from a monolithic structure to a modular architecture. The current implementation has all 7 tools defined inline within the main `index.ts` file, making it difficult to maintain and scale as the tool catalog grows. This refactoring will reorganize the codebase following the patterns demonstrated in the MCP Banking Demo Server documentation, improving code maintainability, readability, and developer experience without changing any tool functionality.

**Problem Statement:** The current MCP server structure has all tool definitions embedded in a single file, making it increasingly difficult to maintain, test, and extend as new tools are added or existing tools become more complex.

**Goal:** Restructure the codebase to use a modular architecture where each tool is defined in its own file and managed through a central registry system, following industry best practices for MCP server development.

## Goals

1. **Improve Code Organization**: Separate each tool into its own dedicated file with clear exports
2. **Enhance Maintainability**: Make it easier for developers to locate, understand, and modify individual tools
3. **Enable Scalability**: Create a structure that supports easy addition of new tools without modifying existing code
4. **Maintain Functionality**: Preserve all existing tool behavior and API contracts exactly as they are
5. **Establish Best Practices**: Implement a registry pattern that serves as a template for future development

## User Stories

**As a developer maintaining the MCP server, I want:**
- Each tool in its own file so I can quickly locate and modify specific functionality
- A clear registry system so I can easily see all available tools at a glance
- Consistent file structure so I know exactly where to find tool definitions and handlers
- The ability to add new tools without touching existing tool code

**As a developer adding new tools, I want:**
- A clear template to follow when creating new tools
- Simple registration process that doesn't require understanding the entire codebase
- Confidence that my new tool won't break existing functionality

**As a developer debugging issues, I want:**
- Isolated tool files so I can focus on one tool at a time
- Clear separation between tool logic and server infrastructure
- Easy identification of which tool is causing problems

## Functional Requirements

### File Structure Requirements

1. **Tool File Organization**: Each existing tool must be moved to its own file in `src/tools/` directory:
   - `pay-bill.tool.ts` - Payment processing tool
   - `check-balance.tool.ts` - Account balance checking tool  
   - `check-transactions.tool.ts` - Transaction history tool
   - `lock-card.tool.ts` - Card locking/freezing tool
   - `about-bank.tool.ts` - Bank information tool
   - `executive-team.tool.ts` - Executive team information tool
   - `technical-leadership.tool.ts` - Technical leadership information tool

2. **Registry System**: Create `src/tools/index.ts` that exports a centralized tool registry containing all tool definitions and handlers

3. **Tool File Structure**: Each tool file must export:
   - `tool`: Tool definition object compatible with MCP SDK
   - `handler`: Async function that implements the tool's functionality
   - Both exports must maintain exact same functionality as current implementation

### Registry Requirements

4. **Central Registry**: The `src/tools/index.ts` file must:
   - Import all individual tool modules
   - Export a `toolRegistry` object mapping tool names to their definitions and handlers
   - Include an `enabled` flag for each tool (all set to `true` initially)
   - Provide helper functions for getting enabled tools and tool handlers

5. **Registry Interface**: The registry must provide:
   - `getEnabledTools()`: Returns array of enabled tool definitions
   - `getToolHandler(toolName: string)`: Returns the handler function for a specific tool
   - `toolRegistry`: Object containing all tool configurations

### Server Integration Requirements

6. **Server Refactor**: Update `src/index.ts` to:
   - Import tools from the registry instead of defining them inline
   - Use registry helper functions to register tools with the MCP server
   - Maintain all existing server functionality (CORS, routing, SSE support)
   - Preserve exact same external API and behavior

7. **Type Safety**: All tool definitions and handlers must:
   - Maintain existing Zod schema validation
   - Preserve TypeScript type safety
   - Use consistent typing patterns across all tools

### Compatibility Requirements

8. **Functional Preservation**: Every tool must:
   - Maintain identical input parameters and validation
   - Return identical response formats and content
   - Preserve all existing business logic exactly
   - Keep same tool names and descriptions

9. **External API Compatibility**: The refactored server must:
   - Respond to the same HTTP endpoints
   - Maintain identical MCP protocol behavior
   - Preserve CORS configuration
   - Keep same SSE and direct MCP connection support

## Non-Goals (Out of Scope)

- **No New Tools**: This refactor will not add any new tool functionality
- **No Tool Modifications**: Existing tool behavior, parameters, or responses will not be changed
- **No Build System Changes**: Will not modify the existing Wrangler/Cloudflare Worker build process
- **No Dependency Changes**: Will not add new external dependencies beyond what's already used
- **No Performance Optimization**: Focus is on structure, not performance improvements
- **No Testing Infrastructure**: Will not add comprehensive testing (can be addressed in future PRDs)
- **No Validation Scripts**: Will not implement build-time validation (can be added later)

## Design Considerations

### File Naming Convention
- Tool files: `[tool-name].tool.ts` (kebab-case)
- Registry file: `index.ts` in tools directory
- Consistent export naming: `tool` and `handler` from each file

### Code Organization
- All tools in `src/tools/` directory
- Registry as the single source of truth for tool configuration
- Clear separation between tool logic and server infrastructure
- Consistent error handling patterns across all tools

### Developer Experience
- Each tool file should be self-contained and readable
- Registry should be easy to understand and modify
- File structure should be intuitive for new developers
- Comments should explain the modular architecture approach

## Technical Considerations

### Cloudflare Worker Compatibility
- All changes must be compatible with Cloudflare Workers runtime
- Module imports must work with Wrangler build system
- No changes to deployment configuration required

### TypeScript Configuration
- Existing `tsconfig.json` should handle the new file structure
- All type definitions must be preserved
- Import/export statements must be compatible with current setup

### MCP SDK Integration
- Registry pattern must work seamlessly with `@modelcontextprotocol/sdk`
- Tool registration process must maintain MCP protocol compliance
- No changes to MCP server initialization required

## Success Metrics

### Code Organization Metrics
- **File Count**: 7 individual tool files + 1 registry file created
- **Main File Size**: `src/index.ts` reduced by ~80% (tool definitions moved out)
- **Tool Isolation**: Each tool completely self-contained in its own file

### Maintainability Metrics  
- **Modification Scope**: Changes to one tool require editing only one file
- **New Tool Addition**: Adding a new tool requires only creating one file + one registry entry
- **Code Discoverability**: Any developer can locate any tool in under 10 seconds

### Functional Metrics
- **API Compatibility**: 100% of existing API calls return identical responses
- **Tool Functionality**: All 7 tools work exactly as before
- **Server Behavior**: No changes to CORS, routing, or connection handling

## Open Questions

1. **Registry Helper Functions**: Should we implement additional helper functions beyond `getEnabledTools()` and `getToolHandler()`?

2. **Error Handling**: Should we standardize error handling patterns across all tools during the refactor, or preserve existing individual approaches?

3. **Future Extensibility**: Should the registry support additional metadata (categories, permissions, etc.) for future enhancements?

4. **Documentation**: Should we add inline documentation to each tool file explaining the modular architecture pattern?

---

**Target Implementation Timeline**: 1-2 development days
**Primary Stakeholder**: Development team maintaining the MCP server
**Success Criteria**: Successful refactor with zero functional changes and improved code organization 