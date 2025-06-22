# Penguin Bank - Supabase Database Documentation

## 📊 Project Overview

**Supabase Project**: `penguin-bank-cloud`
- **Project ID**: `ffypdvkrjmtgwsvxyisr`
- **Region**: `us-east-1`
- **Status**: `ACTIVE_HEALTHY`
- **PostgreSQL Version**: `17.4.1.043`
- **Created**: June 19, 2025

## 🔗 Connection Information

```bash
# Environment Variables (add to your .env files)
SUPABASE_URL=https://ffypdvkrjmtgwsvxyisr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeXBkdmtyam10Z3dzdnh5aXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTM0MzEsImV4cCI6MjA2NTg2OTQzMX0.AUulkHzHVBtXgWu_M4OgdlUUnwJVTglc5HzFMSjBzhE

# Database Connection
DATABASE_HOST=db.ffypdvkrjmtgwsvxyisr.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
```

## 🗄️ Database Schema

### Core Tables

#### 1. **users** - Customer Information
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    name TEXT NOT NULL CHECK (length(name) >= 2 AND length(name) <= 100),
    phone TEXT,
    date_of_birth DATE,
    address JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 2. **accounts** - Bank Accounts
```sql
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    account_type TEXT NOT NULL CHECK (account_type IN ('checking', 'savings')),
    account_number TEXT NOT NULL UNIQUE CHECK (account_number ~ '^PB-[A-Z]{3}-[0-9]{3}$'),
    routing_number TEXT NOT NULL DEFAULT '021000021',
    balance NUMERIC NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
    available_balance NUMERIC NOT NULL DEFAULT 0.00,
    interest_rate NUMERIC DEFAULT 0.0001 CHECK (interest_rate >= 0 AND interest_rate <= 0.1),
    is_active BOOLEAN DEFAULT true,
    daily_limit NUMERIC DEFAULT 1000.00,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 3. **transactions** - Transaction History
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    merchant TEXT,
    category TEXT,
    description TEXT NOT NULL CHECK (length(description) >= 1 AND length(description) <= 500),
    balance_after NUMERIC NOT NULL CHECK (balance_after >= 0),
    reference_number TEXT UNIQUE DEFAULT ('TXN' || replace(gen_random_uuid()::text, '-', '')),
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 4. **bills** - Bill Management
```sql
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    payee TEXT NOT NULL CHECK (length(payee) >= 2 AND length(payee) <= 100),
    statement_balance NUMERIC NOT NULL CHECK (statement_balance >= 0),
    minimum_payment NUMERIC NOT NULL,
    due_date DATE NOT NULL CHECK (due_date >= CURRENT_DATE - INTERVAL '30 days'),
    account_number TEXT,
    category TEXT DEFAULT 'utilities' CHECK (category IN ('utilities', 'credit_card', 'loan', 'insurance', 'subscription', 'other')),
    is_paid BOOLEAN DEFAULT false,
    is_autopay BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 5. **payment_history** - Bill Payment Tracking
```sql
CREATE TABLE payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_id UUID NOT NULL REFERENCES bills(id),
    account_id UUID NOT NULL REFERENCES accounts(id),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    payment_type TEXT NOT NULL CHECK (payment_type IN ('one_time', 'autopay', 'scheduled')),
    confirmation_number TEXT NOT NULL UNIQUE DEFAULT ('PB' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)) CHECK (confirmation_number ~ '^PB[a-f0-9A-F]{12}$'),
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    scheduled_date DATE,
    processed_date TIMESTAMPTZ DEFAULT now(),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### Views

#### 1. **account_summary** - Account Overview
```sql
CREATE VIEW account_summary AS
SELECT 
    a.id,
    a.user_id,
    a.account_type,
    a.account_number,
    a.balance,
    a.available_balance,
    u.name AS user_name,
    u.email AS user_email,
    COUNT(t.id) AS transaction_count,
    MAX(t.created_at) AS last_transaction_date
FROM accounts a
JOIN users u ON a.user_id = u.id
LEFT JOIN transactions t ON a.id = t.account_id
GROUP BY a.id, a.user_id, a.account_type, a.account_number, a.balance, a.available_balance, u.name, u.email;
```

#### 2. **recent_transactions** - Latest Transactions
```sql
CREATE VIEW recent_transactions AS
SELECT 
    t.id,
    t.account_id,
    t.transaction_type,
    t.amount,
    t.merchant,
    t.category,
    t.description,
    t.balance_after,
    t.created_at,
    a.account_number,
    a.account_type,
    u.name AS user_name
FROM transactions t
JOIN accounts a ON t.account_id = a.id
JOIN users u ON a.user_id = u.id
ORDER BY t.created_at DESC;
```

### Functions

#### **update_updated_at_column()** - Auto-update timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## 🔐 Security Configuration

### Row Level Security (RLS)
- ✅ **Enabled** on all tables
- Policies should be configured based on user authentication

### Security Advisors (⚠️ Action Required)
1. **Views with SECURITY DEFINER**: `account_summary` and `recent_transactions`
   - [Fix Guide](https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view)
2. **Function search_path**: `update_updated_at_column` has mutable search_path
   - [Fix Guide](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)

## 🔧 Extensions Installed

### Active Extensions
- `uuid-ossp` - UUID generation
- `pgcrypto` - Cryptographic functions  
- `pg_stat_statements` - Query performance tracking
- `pg_graphql` - GraphQL support
- `supabase_vault` - Secrets management

### Available Extensions
- `vector` - Vector embeddings (for AI features)
- `pg_cron` - Job scheduling
- `http` - HTTP client functions
- `postgis` - Geographic data types
- And many more...

## 🚀 MCP Integration Points

### Key Operations for MCP Server
1. **Account Management**
   - Get account balances: `SELECT * FROM account_summary WHERE user_id = $1`
   - Check account status: `SELECT is_active, daily_limit FROM accounts WHERE id = $1`

2. **Transaction History**
   - Recent transactions: `SELECT * FROM recent_transactions WHERE account_id = $1 LIMIT 10`
   - Transaction search: Filter by category, merchant, date range

3. **Bill Management**
   - Upcoming bills: `SELECT * FROM bills WHERE user_id = $1 AND due_date >= CURRENT_DATE AND is_paid = false`
   - Payment history: `SELECT * FROM payment_history WHERE bill_id = $1`

4. **Transfer Operations**
   - Internal transfers between user accounts
   - Balance validation and transaction logging

### Sample Queries for MCP Functions

```sql
-- Get user account summary
SELECT * FROM account_summary WHERE user_id = $1;

-- Get recent transactions for an account
SELECT * FROM recent_transactions WHERE account_id = $1 LIMIT 20;

-- Get unpaid bills for a user
SELECT * FROM bills 
WHERE user_id = $1 
  AND is_paid = false 
  AND due_date >= CURRENT_DATE 
ORDER BY due_date ASC;

-- Create a new transaction
INSERT INTO transactions (account_id, transaction_type, amount, description, balance_after)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, reference_number;

-- Process bill payment
INSERT INTO payment_history (bill_id, account_id, amount, payment_type)
VALUES ($1, $2, $3, 'one_time')
RETURNING confirmation_number;
```

## 📝 Data Formats & Constraints

### Account Numbers
- Format: `PB-XXX-000` (e.g., `PB-CHK-001`, `PB-SAV-002`)
- Regex: `^PB-[A-Z]{3}-[0-9]{3}$`

### Transaction Reference Numbers
- Format: `TXN` + 32-character hex string
- Auto-generated on insert

### Payment Confirmation Numbers
- Format: `PB` + 12-character hex string
- Regex: `^PB[a-f0-9A-F]{12}$`

### Email Validation
- Regex: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`

## 🔄 Migration History

### Initial Schema (20250118000000)
- Created all core tables
- Set up relationships and constraints
- Enabled RLS on all tables
- Created views and functions

## 🛠️ Development Setup

### 1. Environment Variables
Create `.env` files in your project:

```bash
# my-mcp-server/.env
SUPABASE_URL=https://ffypdvkrjmtgwsvxyisr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeXBkdmtyam10Z3dzdnh5aXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTM0MzEsImV4cCI6MjA2NTg2OTQzMX0.AUulkHzHVBtXgWu_M4OgdlUUnwJVTglc5HzFMSjBzhE
```

### 2. Install Supabase Client
```bash
cd my-mcp-server
npm install @supabase/supabase-js
```

### 3. TypeScript Types
The generated types are available in `my-mcp-server/src/database.types.ts`

## 📚 Useful Resources

- [Supabase Dashboard](https://supabase.com/dashboard/project/ffypdvkrjmtgwsvxyisr)
- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Functions Guide](https://supabase.com/docs/guides/database/functions)

---

*Last Updated: January 21, 2025*
*Database Schema Version: 20250118000000* 