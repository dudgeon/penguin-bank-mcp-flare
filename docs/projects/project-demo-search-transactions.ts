// ============================================================================
// FILE: tools/search-transactions.tool.ts
// ============================================================================

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Tool definition for transaction search
 * Exported separately for clean registration
 */
export const tool: Tool = {
  name: 'search_transactions',
  
  description: `Search and filter bank transactions with flexible parameters. 
This tool translates natural language queries into structured database searches.

EXAMPLES OF NATURAL LANGUAGE TO PARAMETER MAPPING:
- "grocery spending last month" → categories: ["grocery"], daysBack: 30
- "transactions over $100 at Target" → minAmount: 100, merchantSearch: "Target"`,

  inputSchema: {
    type: 'object',
    properties: {
      categories: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['grocery', 'dining', 'transport', 'utilities', 'shopping', 
                 'entertainment', 'healthcare', 'education', 'other']
        },
        description: 'Filter by merchant categories. Can select multiple.'
      },
      
      minAmount: {
        type: 'number',
        minimum: 0,
        description: 'Minimum transaction amount (absolute value)'
      },
      
      merchantSearch: {
        type: 'string',
        description: 'Search merchant names (case-insensitive, partial match)'
      },
      
      daysBack: {
        type: 'integer',
        minimum: 1,
        maximum: 365,
        description: 'Alternative to date range: search last N days'
      },
      
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 200,
        default: 50,
        description: 'Maximum number of results to return'
      }
    },
    required: [],
    additionalProperties: false
  }
};

/**
 * Tool handler - implements the actual logic
 */
export async function handler(
  params: any,
  supabase: SupabaseClient
): Promise<{ content: Array<{ type: string; text: string }> }> {
  try {
    let query = supabase
      .from('transaction_details')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (params.categories?.length > 0) {
      query = query.in('merchant_category', params.categories);
    }
    
    if (params.minAmount !== undefined) {
      query = query.or(`amount.gte.${params.minAmount},amount.lte.${-params.minAmount}`);
    }
    
    if (params.merchantSearch) {
      query = query.ilike('merchant_name', `%${params.merchantSearch}%`);
    }
    
    // Date handling
    if (params.daysBack) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - params.daysBack);
      query = query.gte('transaction_date', startDate.toISOString());
    }
    
    // Execute
    const { data, error } = await query
      .order('transaction_date', { ascending: false })
      .limit(params.limit || 50);
    
    if (error) throw error;
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: true,
          transactions: data,
          metadata: {
            count: data?.length || 0,
            hasMore: (data?.length || 0) === (params.limit || 50)
          }
        }, null, 2)
      }]
    };
    
  } catch (error: any) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: false,
          error: {
            message: error.message || 'Query failed',
            suggestions: ['Try a simpler search', 'Check your parameters']
          }
        }, null, 2)
      }]
    };
  }
}

// ============================================================================
// FILE: tools/index.ts
// Central registry for all tools
// ============================================================================

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SupabaseClient } from '@supabase/supabase-js';

// Import all tool definitions
import * as searchTransactions from './search-transactions.tool.js';
import * as getAccountBalance from './get-account-balance.tool.js';
import * as transferFunds from './transfer-funds.tool.js';

/**
 * Tool registry with metadata
 * This pattern allows for easy tool management and feature flags
 */
export interface ToolDefinition {
  tool: Tool;
  handler: (params: any, context: any) => Promise<any>;
  enabled?: boolean;
  requiredPermissions?: string[];
}

/**
 * Central tool registry
 * Add new tools here as you create them
 */
export const toolRegistry: Record<string, ToolDefinition> = {
  search_transactions: {
    tool: searchTransactions.tool,
    handler: searchTransactions.handler,
    enabled: true
  },
  
  get_account_balance: {
    tool: getAccountBalance.tool,
    handler: getAccountBalance.handler,
    enabled: true
  },
  
  transfer_funds: {
    tool: transferFunds.tool,
    handler: transferFunds.handler,
    enabled: false, // Disabled for demo
    requiredPermissions: ['transfers:write']
  }
};

/**
 * Get all enabled tools for MCP registration
 */
export function getEnabledTools(): Tool[] {
  return Object.values(toolRegistry)
    .filter(def => def.enabled !== false)
    .map(def => def.tool);
}

/**
 * Get handler for a specific tool
 */
export function getToolHandler(toolName: string): ToolDefinition['handler'] | undefined {
  return toolRegistry[toolName]?.handler;
}

// ============================================================================
// FILE: server.ts
// Your main MCP server file
// ============================================================================

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { createClient } from '@supabase/supabase-js';
import { getEnabledTools, getToolHandler } from './tools/index.js';

// Initialize dependencies
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Create MCP server
const server = new Server({
  name: 'banking-demo',
  version: '1.0.0'
});

// Register all enabled tools at startup
server.setRequestHandler('tools/list', async () => {
  return {
    tools: getEnabledTools()
  };
});

// Handle tool invocations
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: params } = request.params;
  
  // Get the handler for this tool
  const handler = getToolHandler(name);
  
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  
  // Execute with context (supabase client, user info, etc.)
  return handler(params, { supabase });
});

// Start the server
server.connect(process.stdin, process.stdout);

// ============================================================================
// FILE: tools/base.ts (Optional)
// Shared utilities and base classes for tools
// ============================================================================

import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Base class for tool implementations (optional pattern)
 * Provides common functionality and structure
 */
export abstract class BaseTool {
  abstract get definition(): Tool;
  abstract handle(params: any, context: any): Promise<any>;
  
  /**
   * Common error handling logic
   */
  protected createErrorResponse(error: any, suggestions?: string[]) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: false,
          error: {
            message: error.message || 'Operation failed',
            type: this.classifyError(error),
            suggestions: suggestions || this.getDefaultSuggestions(error)
          }
        }, null, 2)
      }]
    };
  }
  
  protected classifyError(error: any): string {
    if (error.message?.includes('timeout')) return 'TIMEOUT';
    if (error.message?.includes('permission')) return 'PERMISSION_DENIED';
    if (error.code?.startsWith('PG')) return 'DATABASE_ERROR';
    return 'UNKNOWN_ERROR';
  }
  
  protected getDefaultSuggestions(error: any): string[] {
    return [
      'Check your input parameters',
      'Try a simpler query',
      'Verify your permissions'
    ];
  }
}

// ============================================================================
// FILE: tools/search-transactions-v2.tool.ts
// Example using the base class pattern
// ============================================================================

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool } from './base.js';

export class SearchTransactionsTool extends BaseTool {
  get definition(): Tool {
    return {
      name: 'search_transactions_v2',
      description: 'Search transactions with enhanced error handling',
      inputSchema: {
        type: 'object',
        properties: {
          // ... your schema
        }
      }
    };
  }
  
  async handle(params: any, context: any) {
    try {
      // Implementation using base class utilities
      const results = await this.executeQuery(params, context.supabase);
      return this.createSuccessResponse(results);
    } catch (error) {
      // Uses base class error handling
      return this.createErrorResponse(error);
    }
  }
  
  private async executeQuery(params: any, supabase: any) {
    // Query implementation
  }
  
  private createSuccessResponse(data: any) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, data }, null, 2)
      }]
    };
  }
}

// Export instance for registration
export const tool = new SearchTransactionsTool().definition;
export const handler = (params: any, context: any) => 
  new SearchTransactionsTool().handle(params, context);

// ============================================================================
// FILE: package.json scripts
// Build-time tool validation
// ============================================================================
{
  "scripts": {
    "validate-tools": "ts-node scripts/validate-tools.ts",
    "build": "npm run validate-tools && tsc",
    "dev": "npm run validate-tools && ts-node-dev src/server.ts"
  }
}

// ============================================================================
// FILE: scripts/validate-tools.ts
// Compile-time validation of tool definitions
// ============================================================================

import { getEnabledTools } from '../src/tools/index.js';
import Ajv from 'ajv';

const ajv = new Ajv();

/**
 * Validates all tool definitions at compile time
 * Ensures schemas are valid and tools are properly structured
 */
async function validateTools() {
  console.log('🔍 Validating MCP tool definitions...\n');
  
  const tools = getEnabledTools();
  let hasErrors = false;
  
  for (const tool of tools) {
    console.log(`Checking tool: ${tool.name}`);
    
    // Validate the input schema is valid JSON Schema
    try {
      const validate = ajv.compile(tool.inputSchema);
      console.log(`  ✅ Valid schema`);
    } catch (error: any) {
      console.error(`  ❌ Invalid schema: ${error.message}`);
      hasErrors = true;
    }
    
    // Check description length
    if (tool.description.length < 50) {
      console.warn(`  ⚠️  Description seems too short (${tool.description.length} chars)`);
    }
    
    // Check for required MCP fields
    if (!tool.name.match(/^[a-z_]+$/)) {
      console.error(`  ❌ Tool name should be lowercase with underscores`);
      hasErrors = true;
    }
    
    console.log('');
  }
  
  if (hasErrors) {
    console.error('❌ Tool validation failed!');
    process.exit(1);
  } else {
    console.log('✅ All tools validated successfully!');
  }
}

validateTools().catch(console.error);