-- Sample Data for Penguin Bank Database
-- Use this to populate your database with test data for MCP development

-- Sample Users
INSERT INTO users (id, email, name, phone, date_of_birth, address) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'john.doe@example.com', 'John Doe', '+1-555-123-4567', '1985-03-15', '{"street": "123 Main St", "city": "San Francisco", "state": "CA", "zip": "94102"}'),
('550e8400-e29b-41d4-a716-446655440001', 'jane.smith@example.com', 'Jane Smith', '+1-555-987-6543', '1990-07-22', '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zip": "90210"}'),
('550e8400-e29b-41d4-a716-446655440002', 'mike.wilson@example.com', 'Mike Wilson', '+1-555-456-7890', '1982-11-08', '{"street": "789 Pine Rd", "city": "Seattle", "state": "WA", "zip": "98101"}');

-- Sample Accounts
INSERT INTO accounts (user_id, account_type, account_number, balance, available_balance, daily_limit) VALUES
-- John Doe's accounts
('550e8400-e29b-41d4-a716-446655440000', 'checking', 'PB-CHK-001', 2547.83, 2547.83, 1000.00),
('550e8400-e29b-41d4-a716-446655440000', 'savings', 'PB-SAV-001', 15420.50, 15420.50, 500.00),
-- Jane Smith's accounts
('550e8400-e29b-41d4-a716-446655440001', 'checking', 'PB-CHK-002', 892.45, 892.45, 1500.00),
('550e8400-e29b-41d4-a716-446655440001', 'savings', 'PB-SAV-002', 8750.00, 8750.00, 300.00),
-- Mike Wilson's accounts
('550e8400-e29b-41d4-a716-446655440002', 'checking', 'PB-CHK-003', 4123.67, 4123.67, 2000.00),
('550e8400-e29b-41d4-a716-446655440002', 'savings', 'PB-SAV-003', 22500.25, 22500.25, 1000.00);

-- Sample Transactions (Recent activity)
INSERT INTO transactions (account_id, transaction_type, amount, description, balance_after, merchant, category, created_at) VALUES
-- John Doe's transactions
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'), 'debit', 45.67, 'Grocery Store Purchase', 2547.83, 'SuperMart', 'groceries', now() - interval '2 hours'),
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'), 'debit', 12.50, 'Coffee Shop', 2593.50, 'Daily Grind Cafe', 'dining', now() - interval '1 day'),
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'), 'credit', 3200.00, 'Salary Deposit', 2606.00, 'ACME Corporation', 'salary', now() - interval '3 days'),
((SELECT id FROM accounts WHERE account_number = 'PB-SAV-001'), 'credit', 500.00, 'Transfer from Checking', 15420.50, 'Internal Transfer', 'transfer', now() - interval '1 week'),

-- Jane Smith's transactions  
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-002'), 'debit', 89.99, 'Online Shopping', 892.45, 'Amazon', 'shopping', now() - interval '3 hours'),
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-002'), 'debit', 65.00, 'Gas Station', 982.44, 'Shell Station', 'transportation', now() - interval '2 days'),
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-002'), 'credit', 2800.00, 'Freelance Payment', 1047.44, 'Design Client LLC', 'income', now() - interval '5 days'),

-- Mike Wilson's transactions
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-003'), 'debit', 156.78, 'Restaurant Dinner', 4123.67, 'Fine Dining Co', 'dining', now() - interval '1 hour'),
((SELECT id FROM accounts WHERE account_number = 'PB-CHK-003'), 'debit', 25.00, 'ATM Withdrawal', 4280.45, 'Bank ATM', 'cash', now() - interval '4 days'),
((SELECT id FROM accounts WHERE account_number = 'PB-SAV-003'), 'credit', 1000.00, 'Investment Return', 22500.25, 'Investment Fund', 'investment', now() - interval '1 week');

-- Sample Bills
INSERT INTO bills (user_id, payee, statement_balance, minimum_payment, due_date, category, account_number) VALUES
-- John Doe's bills
('550e8400-e29b-41d4-a716-446655440000', 'Pacific Gas & Electric', 125.67, 125.67, CURRENT_DATE + interval '15 days', 'utilities', '1234567890'),
('550e8400-e29b-41d4-a716-446655440000', 'Chase Credit Card', 1847.32, 55.00, CURRENT_DATE + interval '12 days', 'credit_card', '****-****-****-1234'),
('550e8400-e29b-41d4-a716-446655440000', 'Comcast Internet', 89.99, 89.99, CURRENT_DATE + interval '8 days', 'utilities', 'ACC-789456123'),

-- Jane Smith's bills
('550e8400-e29b-41d4-a716-446655440001', 'Los Angeles Water', 78.45, 78.45, CURRENT_DATE + interval '20 days', 'utilities', 'WATER-456789'),
('550e8400-e29b-41d4-a716-446655440001', 'Capital One Card', 567.89, 25.00, CURRENT_DATE + interval '18 days', 'credit_card', '****-****-****-5678'),
('550e8400-e29b-41d4-a716-446655440001', 'Netflix Subscription', 15.99, 15.99, CURRENT_DATE + interval '5 days', 'subscription', 'AUTO-PAY'),

-- Mike Wilson's bills
('550e8400-e29b-41d4-a716-446655440002', 'Seattle City Light', 145.23, 145.23, CURRENT_DATE + interval '25 days', 'utilities', 'SCL-987654321'),
('550e8400-e29b-41d4-a716-446655440002', 'American Express', 2134.56, 75.00, CURRENT_DATE + interval '14 days', 'credit_card', '****-****-****-9012'),
('550e8400-e29b-41d4-a716-446655440002', 'Car Insurance', 234.50, 234.50, CURRENT_DATE + interval '10 days', 'insurance', 'AUTO-789123');

-- Sample Payment History
INSERT INTO payment_history (bill_id, account_id, amount, payment_type, status, processed_date, notes) VALUES
-- Recent payments
((SELECT id FROM bills WHERE payee = 'Netflix Subscription'), (SELECT id FROM accounts WHERE account_number = 'PB-CHK-002'), 15.99, 'autopay', 'completed', now() - interval '2 days', 'Monthly subscription auto-payment'),
((SELECT id FROM bills WHERE payee = 'Comcast Internet'), (SELECT id FROM accounts WHERE account_number = 'PB-CHK-001'), 89.99, 'one_time', 'completed', now() - interval '1 week', 'Paid online'),
((SELECT id FROM bills WHERE payee = 'Car Insurance'), (SELECT id FROM accounts WHERE account_number = 'PB-CHK-003'), 234.50, 'scheduled', 'completed', now() - interval '3 days', 'Quarterly payment');

-- Update some bills as paid
UPDATE bills SET is_paid = true WHERE payee IN ('Netflix Subscription', 'Comcast Internet', 'Car Insurance');

-- Set up autopay for some bills
UPDATE bills SET is_autopay = true WHERE payee IN ('Netflix Subscription'); 