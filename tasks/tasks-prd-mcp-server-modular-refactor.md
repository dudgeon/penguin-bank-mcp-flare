## Relevant Files

- `my-mcp-server/src/tools/index.ts` - Central tool registry that imports and manages all tools
- `my-mcp-server/src/tools/pay-bill.tool.ts` - Payment processing tool extracted from main server
- `my-mcp-server/src/tools/check-balance.tool.ts` - Account balance checking tool
- `my-mcp-server/src/tools/check-transactions.tool.ts` - Transaction history retrieval tool
- `my-mcp-server/src/tools/lock-card.tool.ts` - Card locking/freezing functionality tool
- `my-mcp-server/src/tools/about-bank.tool.ts` - Bank information tool
- `my-mcp-server/src/tools/executive-team.tool.ts` - Executive team information tool
- `my-mcp-server/src/tools/technical-leadership.tool.ts` - Technical leadership information tool
- `my-mcp-server/src/index.ts` - Main server file (to be refactored to use registry)

### Notes

- All tool files must export both `tool` (definition) and `handler` (function) to maintain consistency
- The registry pattern allows for easy enabling/disabling of tools and future extensibility
- Existing functionality must be preserved exactly - no changes to tool behavior, parameters, or responses
- Use `npm run dev` in the my-mcp-server directory to test the refactored server locally
- TypeScript compilation will catch any import/export issues during development

## Tasks

- [ ] 1.0 Create Tools Directory Structure
  - [ ] 1.1 Create `my-mcp-server/src/tools/` directory
  - [ ] 1.2 Verify directory structure is compatible with existing TypeScript configuration
  - [ ] 1.3 Ensure proper module resolution paths for the new directory structure

- [ ] 2.0 Extract Individual Tool Files
  - [ ] 2.1 Extract `pay-my-bill` tool to `pay-bill.tool.ts` with proper tool definition and handler exports
  - [ ] 2.2 Extract `check-my-balance` tool to `check-balance.tool.ts` with proper tool definition and handler exports
  - [ ] 2.3 Extract `check-recent-transactions` tool to `check-transactions.tool.ts` with proper tool definition and handler exports
  - [ ] 2.4 Extract `lock-my-card` tool to `lock-card.tool.ts` with proper tool definition and handler exports
  - [ ] 2.5 Extract `about-penguin-bank` tool to `about-bank.tool.ts` with proper tool definition and handler exports
  - [ ] 2.6 Extract `get_executive_team` tool to `executive-team.tool.ts` with proper tool definition and handler exports
  - [ ] 2.7 Extract `get_technical_leadership` tool to `technical-leadership.tool.ts` with proper tool definition and handler exports
  - [ ] 2.8 Ensure all Zod schema validations are preserved exactly in each extracted tool file
  - [ ] 2.9 Verify each tool file exports both `tool` and `handler` with consistent naming

- [ ] 3.0 Build Central Tool Registry
  - [ ] 3.1 Create `my-mcp-server/src/tools/index.ts` registry file
  - [ ] 3.2 Import all individual tool modules into the registry
  - [ ] 3.3 Create `toolRegistry` object mapping tool names to their definitions, handlers, and enabled status
  - [ ] 3.4 Implement `getEnabledTools()` function to return array of enabled tool definitions
  - [ ] 3.5 Implement `getToolHandler(toolName: string)` function to return specific tool handlers
  - [ ] 3.6 Set all tools to `enabled: true` initially to maintain current behavior
  - [ ] 3.7 Add TypeScript types for registry structure to ensure type safety

- [ ] 4.0 Refactor Main Server Integration
  - [ ] 4.1 Update `my-mcp-server/src/index.ts` to import from tools registry instead of inline definitions
  - [ ] 4.2 Replace inline tool definitions with registry-based tool registration
  - [ ] 4.3 Use `getEnabledTools()` and `getToolHandler()` functions for tool registration with MCP server
  - [ ] 4.4 Preserve all existing server functionality (CORS, routing, SSE support)
  - [ ] 4.5 Maintain identical external API endpoints and behavior
  - [ ] 4.6 Ensure MyMCP class initialization process remains unchanged
  - [ ] 4.7 Verify all import statements work correctly with Cloudflare Worker runtime

- [ ] 5.0 Validate Functionality and Compatibility
  - [ ] 5.1 Run TypeScript compilation to check for any type errors or import issues
  - [ ] 5.2 Test local development server with `npm run dev` to ensure all tools load correctly
  - [ ] 5.3 Verify each tool responds with identical output to original implementation
  - [ ] 5.4 Test all 7 tools individually to confirm parameter validation and response format preservation
  - [ ] 5.5 Confirm CORS headers and SSE connections work as before
  - [ ] 5.6 Validate that MCP protocol compliance is maintained
  - [ ] 5.7 Ensure Cloudflare Worker deployment compatibility (no build process changes)
  - [ ] 5.8 Confirm main server file size reduction (~80% as specified in success metrics) 