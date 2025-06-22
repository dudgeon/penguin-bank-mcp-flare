-- Penguin Bank Database Schema
-- PostgreSQL 17.4+ with Supabase Extensions
-- Created: 2025-01-18
-- Last Updated: 2025-01-21

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS TABLE - Customer Information
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE 
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    name TEXT NOT NULL 
        CHECK (length(name) >= 2 AND length(name) <= 100),
    phone TEXT,
    date_of_birth DATE,
    address JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ACCOUNTS TABLE - Bank Accounts
-- ============================================================================
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    account_type TEXT NOT NULL 
        CHECK (account_type IN ('checking', 'savings')),
    account_number TEXT NOT NULL UNIQUE 
        CHECK (account_number ~ '^PB-[A-Z]{3}-[0-9]{3}$'),
    routing_number TEXT NOT NULL DEFAULT '021000021',
    balance NUMERIC NOT NULL DEFAULT 0.00 
        CHECK (balance >= 0),
    available_balance NUMERIC NOT NULL DEFAULT 0.00,
    interest_rate NUMERIC DEFAULT 0.0001 
        CHECK (interest_rate >= 0 AND interest_rate <= 0.1),
    is_active BOOLEAN DEFAULT true,
    daily_limit NUMERIC DEFAULT 1000.00,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TRANSACTIONS TABLE - Transaction History
-- ============================================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id),
    transaction_type TEXT NOT NULL 
        CHECK (transaction_type IN ('credit', 'debit')),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    merchant TEXT,
    category TEXT,
    description TEXT NOT NULL 
        CHECK (length(description) >= 1 AND length(description) <= 500),
    balance_after NUMERIC NOT NULL CHECK (balance_after >= 0),
    reference_number TEXT UNIQUE DEFAULT (
        'TXN' || replace(gen_random_uuid()::text, '-', '')
    ),
    status TEXT DEFAULT 'completed' 
        CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- BILLS TABLE - Bill Management
-- ============================================================================
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    payee TEXT NOT NULL 
        CHECK (length(payee) >= 2 AND length(payee) <= 100),
    statement_balance NUMERIC NOT NULL CHECK (statement_balance >= 0),
    minimum_payment NUMERIC NOT NULL,
    due_date DATE NOT NULL 
        CHECK (due_date >= CURRENT_DATE - INTERVAL '30 days'),
    account_number TEXT,
    category TEXT DEFAULT 'utilities' 
        CHECK (category IN ('utilities', 'credit_card', 'loan', 'insurance', 'subscription', 'other')),
    is_paid BOOLEAN DEFAULT false,
    is_autopay BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PAYMENT_HISTORY TABLE - Bill Payment Tracking
-- ============================================================================
CREATE TABLE payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_id UUID NOT NULL REFERENCES bills(id),
    account_id UUID NOT NULL REFERENCES accounts(id),
    amount NUMERIC NOT NULL CHECK (amount > 0),
    payment_type TEXT NOT NULL 
        CHECK (payment_type IN ('one_time', 'autopay', 'scheduled')),
    confirmation_number TEXT NOT NULL UNIQUE DEFAULT (
        'PB' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)
    ) CHECK (confirmation_number ~ '^PB[a-f0-9A-F]{12}$'),
    status TEXT DEFAULT 'completed' 
        CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    scheduled_date DATE,
    processed_date TIMESTAMPTZ DEFAULT now(),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Triggers for updated_at columns
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at 
    BEFORE UPDATE ON accounts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bills_updated_at 
    BEFORE UPDATE ON bills 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Account Summary View
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
GROUP BY a.id, a.user_id, a.account_type, a.account_number, 
         a.balance, a.available_balance, u.name, u.email;

-- Recent Transactions View
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

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Indexes on foreign keys
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_bills_user_id ON bills(user_id);
CREATE INDEX idx_payment_history_bill_id ON payment_history(bill_id);
CREATE INDEX idx_payment_history_account_id ON payment_history(account_id);

-- Indexes for common queries
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_bills_due_date ON bills(due_date);
CREATE INDEX idx_bills_is_paid ON bills(is_paid);
CREATE INDEX idx_accounts_account_number ON accounts(account_number);
CREATE INDEX idx_users_email ON users(email);

-- Composite indexes for common query patterns
CREATE INDEX idx_transactions_account_created ON transactions(account_id, created_at DESC);
CREATE INDEX idx_bills_user_due_paid ON bills(user_id, due_date, is_paid);

-- ============================================================================
-- SAMPLE ROW LEVEL SECURITY POLICIES (TEMPLATE)
-- ============================================================================

-- Note: These are templates - adjust based on your authentication system

-- Users can only see their own data
-- CREATE POLICY "Users can view own profile" ON users
--     FOR SELECT USING (auth.uid() = id);

-- CREATE POLICY "Users can update own profile" ON users
--     FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own accounts
-- CREATE POLICY "Users can view own accounts" ON accounts
--     FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own transactions
-- CREATE POLICY "Users can view own transactions" ON transactions
--     FOR SELECT USING (
--         auth.uid() IN (
--             SELECT user_id FROM accounts WHERE id = account_id
--         )
--     );

-- Users can only see their own bills
-- CREATE POLICY "Users can view own bills" ON bills
--     FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own payment history
-- CREATE POLICY "Users can view own payment history" ON payment_history
--     FOR SELECT USING (
--         auth.uid() IN (
--             SELECT user_id FROM accounts WHERE id = account_id
--         )
--     );

-- ============================================================================
-- SAMPLE DATA (FOR TESTING)
-- ============================================================================

-- Uncomment to insert sample data for testing
/*
-- Sample user
INSERT INTO users (id, email, name, phone) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'john.doe@example.com', 'John Doe', '+1-555-123-4567');

-- Sample accounts
INSERT INTO accounts (user_id, account_type, account_number, balance, available_balance) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'checking', 'PB-CHK-001', 2500.00, 2500.00),
('550e8400-e29b-41d4-a716-446655440000', 'savings', 'PB-SAV-001', 10000.00, 10000.00);

-- Sample transactions
INSERT INTO transactions (account_id, transaction_type, amount, description, balance_after, merchant, category) VALUES
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'), 'debit', 45.67, 'Grocery Store Purchase', 2454.33, 'SuperMart', 'groceries'),
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'), 'credit', 3000.00, 'Salary Deposit', 5454.33, 'ACME Corp', 'salary'),
((SELECT id FROM accounts WHERE account_number = 'PB-SAV-001'), 'credit', 500.00, 'Transfer from Checking', 10500.00, 'Internal Transfer', 'transfer');

-- Sample bills
INSERT INTO bills (user_id, payee, statement_balance, minimum_payment, due_date, category) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Electric Company', 125.50, 125.50, CURRENT_DATE + INTERVAL '15 days', 'utilities'),
('550e8400-e29b-41d4-a716-446655440000', 'Credit Card Co', 1250.00, 35.00, CURRENT_DATE + INTERVAL '10 days', 'credit_card');
*/

-- ============================================================================
-- MIGRATION TRACKING
-- ============================================================================

-- Create migrations table to track schema changes
CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    applied_at TIMESTAMPTZ DEFAULT now()
);

-- Record this initial migration
INSERT INTO schema_migrations (version, name) VALUES 
('20250118000000', 'initial_schema')
ON CONFLICT (version) DO NOTHING;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE users IS 'Customer information and profiles';
COMMENT ON TABLE accounts IS 'Bank accounts (checking and savings)';
COMMENT ON TABLE transactions IS 'All account transactions (credits and debits)';
COMMENT ON TABLE bills IS 'Bills to be paid by customers';
COMMENT ON TABLE payment_history IS 'History of bill payments made';

COMMENT ON COLUMN accounts.account_number IS 'Format: PB-XXX-000 (e.g., PB-CHK-001)';
COMMENT ON COLUMN transactions.reference_number IS 'Unique transaction reference (TXN + 32 chars)';
COMMENT ON COLUMN payment_history.confirmation_number IS 'Payment confirmation (PB + 12 hex chars)';

-- End of schema 