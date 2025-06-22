-- Sample Queries for Penguin Bank MCP Server
-- These queries demonstrate common banking operations for the MCP integration

-- ============================================================================
-- USER & ACCOUNT QUERIES
-- ============================================================================

-- Get user profile by email
SELECT id, email, name, phone, date_of_birth, address, created_at
FROM users 
WHERE email = 'john.doe@example.com';

-- Get all accounts for a user
SELECT * FROM account_summary 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';

-- Get account balance and details
SELECT account_number, account_type, balance, available_balance, daily_limit, is_active
FROM accounts 
WHERE account_number = 'PB-CHK-001';

-- ============================================================================
-- TRANSACTION QUERIES
-- ============================================================================

-- Get recent transactions for an account (last 10)
SELECT * FROM recent_transactions 
WHERE account_id = (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001')
LIMIT 10;

-- Get transactions by category for budgeting
SELECT 
    category,
    COUNT(*) as transaction_count,
    SUM(amount) as total_amount,
    AVG(amount) as avg_amount
FROM transactions 
WHERE account_id = (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001')
    AND transaction_type = 'debit'
    AND created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY category
ORDER BY total_amount DESC;

-- Search transactions by merchant or description
SELECT t.*, a.account_number, a.account_type
FROM transactions t
JOIN accounts a ON t.account_id = a.id
WHERE a.user_id = '550e8400-e29b-41d4-a716-446655440000'
    AND (t.merchant ILIKE '%coffee%' OR t.description ILIKE '%coffee%')
ORDER BY t.created_at DESC;

-- Get monthly spending summary
SELECT 
    DATE_TRUNC('month', created_at) as month,
    SUM(CASE WHEN transaction_type = 'debit' THEN amount ELSE 0 END) as total_spent,
    SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE 0 END) as total_received,
    COUNT(*) as transaction_count
FROM transactions
WHERE account_id = (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001')
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC
LIMIT 6;

-- ============================================================================
-- BILL MANAGEMENT QUERIES
-- ============================================================================

-- Get upcoming bills for a user
SELECT payee, statement_balance, minimum_payment, due_date, category, is_autopay
FROM bills 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
    AND is_paid = false 
    AND due_date >= CURRENT_DATE 
ORDER BY due_date ASC;

-- Get overdue bills
SELECT payee, statement_balance, minimum_payment, due_date, 
       (CURRENT_DATE - due_date) as days_overdue
FROM bills 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
    AND is_paid = false 
    AND due_date < CURRENT_DATE 
ORDER BY due_date ASC;

-- Get bills due in next 7 days
SELECT payee, statement_balance, minimum_payment, due_date, category
FROM bills 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
    AND is_paid = false 
    AND due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
ORDER BY due_date ASC;

-- Get payment history for a specific bill
SELECT ph.*, b.payee, a.account_number
FROM payment_history ph
JOIN bills b ON ph.bill_id = b.id
JOIN accounts a ON ph.account_id = a.id
WHERE b.payee = 'Pacific Gas & Electric'
    AND b.user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY ph.processed_date DESC;

-- ============================================================================
-- TRANSFER & PAYMENT OPERATIONS
-- ============================================================================

-- Check if transfer is possible (sufficient balance)
SELECT 
    account_number,
    balance,
    available_balance,
    daily_limit,
    CASE 
        WHEN available_balance >= 500.00 THEN 'APPROVED'
        ELSE 'INSUFFICIENT_FUNDS'
    END as transfer_status
FROM accounts 
WHERE account_number = 'PB-CHK-001';

-- Get accounts for internal transfer (same user)
SELECT account_number, account_type, balance, available_balance
FROM accounts 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
    AND is_active = true
ORDER BY account_type;

-- ============================================================================
-- ANALYTICS & INSIGHTS
-- ============================================================================

-- Monthly spending by category
SELECT 
    category,
    SUM(amount) as total_spent,
    COUNT(*) as transaction_count,
    ROUND(AVG(amount), 2) as avg_transaction
FROM transactions 
WHERE account_id = (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001')
    AND transaction_type = 'debit'
    AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY category
ORDER BY total_spent DESC;

-- Account activity summary
SELECT 
    a.account_number,
    a.account_type,
    a.balance,
    COUNT(t.id) as total_transactions,
    MAX(t.created_at) as last_transaction,
    SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) as total_credits,
    SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) as total_debits
FROM accounts a
LEFT JOIN transactions t ON a.id = t.account_id
WHERE a.user_id = '550e8400-e29b-41d4-a716-446655440000'
GROUP BY a.id, a.account_number, a.account_type, a.balance
ORDER BY a.account_type;

-- ============================================================================
-- EXAMPLE INSERT OPERATIONS (for MCP functions)
-- ============================================================================

-- Create a new transaction (example)
/*
INSERT INTO transactions (account_id, transaction_type, amount, description, balance_after, merchant, category)
VALUES (
    (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'),
    'debit',
    25.99,
    'Coffee shop purchase',
    (SELECT balance - 25.99 FROM accounts WHERE account_number = 'PB-CHK-001'),
    'Local Coffee Co',
    'dining'
)
RETURNING id, reference_number, created_at;
*/

-- Process a bill payment (example)
/*
INSERT INTO payment_history (bill_id, account_id, amount, payment_type, notes)
VALUES (
    (SELECT id FROM bills WHERE payee = 'Pacific Gas & Electric' AND user_id = '550e8400-e29b-41d4-a716-446655440000'),
    (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'),
    125.67,
    'one_time',
    'Paid via MCP banking assistant'
)
RETURNING confirmation_number, processed_date;
*/

-- Update bill as paid after payment
/*
UPDATE bills 
SET is_paid = true, updated_at = now()
WHERE id = (SELECT id FROM bills WHERE payee = 'Pacific Gas & Electric' AND user_id = '550e8400-e29b-41d4-a716-446655440000');
*/

-- Update account balance after transaction
/*
UPDATE accounts 
SET 
    balance = balance - 125.67,
    available_balance = available_balance - 125.67,
    updated_at = now()
WHERE account_number = 'PB-CHK-001';
*/ 