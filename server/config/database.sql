-- SpendWise Database Setup (clean)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon_name VARCHAR(50),
    color VARCHAR(7),
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense', 'both'))
);

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id),
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    description VARCHAR(255) NOT NULL,
    notes TEXT,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    currency VARCHAR(10) DEFAULT 'USD',
    timezone VARCHAR(50) DEFAULT 'UTC',
    theme VARCHAR(10) DEFAULT 'dark',
    push_notifications BOOLEAN DEFAULT true,
    email_reports BOOLEAN DEFAULT false,
    high_contrast BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_name VARCHAR(100) NOT NULL,
    device_token TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ,
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert test user (matching TEST_USER_ID in .env)
INSERT INTO users (id, email, password_hash, full_name)
VALUES ('00000000-0000-0000-0000-000000000001', 'user@spendwise.app', 'placeholder', 'Test User')
ON CONFLICT (id) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, icon_name, color, type) VALUES
  ('Salary',        '💰', '#22c55e', 'income'),
  ('Freelance',     '💼', '#3b82f6', 'income'),
  ('Investments',   '📈', '#8b5cf6', 'income'),
  ('Gifts',         '🎁', '#f59e0b', 'both'),
  ('Food & Dining', '🍔', '#ef4444', 'expense'),
  ('Transportation','🚗', '#f97316', 'expense'),
  ('Shopping',      '🛍️', '#ec4899', 'expense'),
  ('Entertainment', '🎬', '#a855f7', 'expense'),
  ('Bills & Utilities','💡','#06b6d4','expense'),
  ('Healthcare',    '🏥', '#14b8a6', 'expense'),
  ('Education',     '📚', '#6366f1', 'expense'),
  ('Rent',          '🏠', '#64748b', 'expense'),
  ('Other',         '📁', '#78716c', 'both')
ON CONFLICT (name) DO NOTHING;

-- Insert some sample transactions for the test user
INSERT INTO transactions (user_id, category_id, type, amount, description, notes, transaction_date) VALUES
  ('00000000-0000-0000-0000-000000000001', 1, 'income',  5000.00, 'Monthly Salary',       'June 2026 salary',           '2026-06-01'),
  ('00000000-0000-0000-0000-000000000001', 2, 'income',  1200.00, 'Web Design Project',   'Client: Acme Corp',          '2026-06-05'),
  ('00000000-0000-0000-0000-000000000001', 5, 'expense',  85.50, 'Grocery Shopping',      'Weekly groceries',           '2026-06-03'),
  ('00000000-0000-0000-0000-000000000001', 6, 'expense',  45.00, 'Uber Rides',            'Work commute',               '2026-06-04'),
  ('00000000-0000-0000-0000-000000000001', 7, 'expense', 299.99, 'New Headphones',        'Sony WH-1000XM5',            '2026-06-06'),
  ('00000000-0000-0000-0000-000000000001', 8, 'expense',  15.99, 'Netflix Subscription',  'Monthly streaming',          '2026-06-01'),
  ('00000000-0000-0000-0000-000000000001', 9, 'expense', 150.00, 'Electricity Bill',      'June bill',                  '2026-06-10'),
  ('00000000-0000-0000-0000-000000000001', 10,'expense',  75.00, 'Doctor Visit',          'Annual checkup',             '2026-06-12'),
  ('00000000-0000-0000-0000-000000000001', 12,'expense',1200.00, 'Monthly Rent',          'June rent',                  '2026-06-01'),
  ('00000000-0000-0000-0000-000000000001', 5, 'expense',  42.30, 'Restaurant Dinner',     'Birthday celebration',       '2026-06-15'),
  ('00000000-0000-0000-0000-000000000001', 3, 'income',   350.00, 'Stock Dividends',      'Q2 dividends',               '2026-06-14'),
  ('00000000-0000-0000-0000-000000000001', 11,'expense',  49.99, 'Online Course',         'Udemy course',               '2026-06-08')
ON CONFLICT DO NOTHING;

-- Insert default settings for test user
INSERT INTO settings (user_id, currency, timezone, theme, push_notifications, email_reports, high_contrast)
VALUES ('00000000-0000-0000-0000-000000000001', 'USD', 'UTC', 'dark', true, false, false)
ON CONFLICT (user_id) DO NOTHING;