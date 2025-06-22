# Supabase Integration Setup Guide

## 🚀 Quick Start

### 1. Create Environment File
Create `my-mcp-server/.env` with your Supabase credentials:

```bash
# Copy the template and fill in your values
cp my-mcp-server/.env.example my-mcp-server/.env
```

Your `.env` should contain:
```bash
SUPABASE_URL=https://ffypdvkrjmtgwsvxyisr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeXBkdmtyam10Z3dzdnh5aXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTM0MzEsImV4cCI6MjA2NTg2OTQzMX0.AUulkHzHVBtXgWu_M4OgdlUUnwJVTglc5HzFMSjBzhE
NODE_ENV=development
PORT=3001
MCP_SERVER_NAME=penguin-bank-mcp
MCP_SERVER_VERSION=1.0.0
```

### 2. Install Dependencies
```bash
cd my-mcp-server
npm install
```

### 3. Populate Database with Sample Data (Optional)
If you want to test with realistic data, run the sample data script in your Supabase SQL editor:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/ffypdvkrjmtgwsvxyisr)
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/sample-data.sql`
4. Run the script

This will create:
- 3 sample users (John Doe, Jane Smith, Mike Wilson)
- 6 bank accounts (2 per user)
- Recent transactions
- Upcoming bills
- Payment history

### 4. Test Database Connection
You can test queries using the sample queries in `database/sample-queries.sql`

## 📁 Files Created

- **`my-mcp-server/src/database.types.ts`** - TypeScript types for your database
- **`my-mcp-server/.env.example`** - Environment variables template
- **`database/schema.sql`** - Complete database schema
- **`database/sample-data.sql`** - Test data for development
- **`database/sample-queries.sql`** - Common queries for MCP functions
- **`SUPABASE_INFO.md`** - Complete database documentation

## 🔧 Next Steps

### 1. Update MCP Server
Modify `my-mcp-server/src/index.ts` to include Supabase client and banking functions:

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types.js'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)
```

### 2. Add Banking Functions
Common functions to implement:
- `get_account_balance` - Check account balances
- `get_recent_transactions` - View transaction history
- `get_upcoming_bills` - List bills due
- `transfer_funds` - Internal transfers
- `pay_bill` - Process bill payments

### 3. Security Considerations
- Implement user authentication
- Set up Row Level Security (RLS) policies
- Use service role key for admin operations
- Validate all inputs

## 🔍 Useful Commands

```bash
# Install dependencies
cd my-mcp-server && npm install

# Build the MCP server
npm run build

# Run in development mode
npm run dev

# Check database connection (in Supabase SQL editor)
SELECT * FROM account_summary LIMIT 5;
```

## 📚 Resources

- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript)
- [MCP SDK Documentation](https://modelcontextprotocol.io/docs)
- [Your Database Dashboard](https://supabase.com/dashboard/project/ffypdvkrjmtgwsvxyisr)

## 🐛 Troubleshooting

**Connection Issues:**
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure API keys are valid

**Query Errors:**
- Check RLS policies if using authenticated users
- Verify table names match your schema
- Use the generated TypeScript types for type safety

**MCP Integration:**
- Ensure proper error handling in functions
- Return structured data that matches MCP expectations
- Test functions individually before integration 