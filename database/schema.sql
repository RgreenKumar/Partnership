CREATE DATABASE IF NOT EXISTS partnership;
USE partnership;

-- Drop existing tables to ensure clean schema update if re-importing
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS commissions;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS manual_sales;
DROP TABLE IF EXISTS payment_requests;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS activity_logs;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','reseller','user') DEFAULT 'user',
    phone VARCHAR(20),
    address TEXT,
    company_name VARCHAR(150),
    upi_id VARCHAR(100),
    referral_code VARCHAR(50) UNIQUE NULL,
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    referred_by_reseller_id INT NULL,
    total_items_sold INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(referred_by_reseller_id) REFERENCES users(id) ON DELETE SET NULL
);



-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) DEFAULT 'Business Software',
    description TEXT,
    cost_price DECIMAL(10,2) DEFAULT 0.00,
    price DECIMAL(10,2) NOT NULL,
    current_stock INT DEFAULT 10,
    subscribers_count INT DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0.00,
    image VARCHAR(255),
    status ENUM('active','draft','disabled') DEFAULT 'active',
    is_published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders / Payment Requests Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    reseller_id INT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'UPI (GPay)',
    transaction_id VARCHAR(100),
    payment_proof VARCHAR(255),
    status ENUM('pending','approved','rejected','expired') DEFAULT 'pending',
    rejection_reason TEXT,
    billing_cycle VARCHAR(50) DEFAULT 'Monthly',
    start_date DATE NULL,
    next_billing_date DATE NULL,
    commission_earned DECIMAL(10,2) DEFAULT 0.00,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY(reseller_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. Payment Requests Table (Alias/Sync table for strict requirements)
CREATE TABLE IF NOT EXISTS payment_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_id VARCHAR(100),
    payment_proof VARCHAR(255),
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 5. Purchases Table (Created upon payment approval)
CREATE TABLE IF NOT EXISTS purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    reseller_id INT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Approved',
    activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 6. Manual Sales Entry Table
CREATE TABLE IF NOT EXISTS manual_sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    reseller_id INT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Cash / Offline',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(admin_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 7. Reseller Commissions Table
CREATE TABLE IF NOT EXISTS commissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    reseller_id INT NOT NULL,
    sale_amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    status ENUM('pending','paid','rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(reseller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT
);

-- SEED DEMO DATA

-- Default Settings
INSERT INTO settings (setting_key, setting_value) VALUES 
('marketplace_name', 'PartnerShip'),
('support_email', 'support@partnership.com'),
('company_name', 'PartnerShip Technologies Pvt. Ltd.'),
('website', 'https://partnership.com'),
('currency', '₹'),
('timezone', 'Asia/Kolkata'),
('upi_id', 'partnership@okaxis'),
('bank_account_name', 'PartnerShip Technologies Pvt Ltd'),
('bank_name', 'HDFC Bank'),
('bank_account_number', '50200088991122'),
('bank_ifsc', 'HDFC0001234'),
('smtp_host', 'smtp.partnerhost.com'),
('smtp_port', '587'),
('smtp_username', 'noreply@partnership.com'),
('smtp_password', '••••••••••••'),
('sender_email', 'noreply@partnership.com'),
('sender_name', 'PartnerShip Support')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);

-- Default Users with Referral Codes
INSERT INTO users (id, name, email, password, role, phone, address, company_name, upi_id, referral_code, total_items_sold, total_spent, status) VALUES
(1, 'Admin User', 'admin@gmail.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'admin', '+91 98765 43210', '100 Admin Plaza, Tech Park, Bengaluru', 'PartnerShip Corp', 'admin@okaxis', NULL, 120, 0.00, 1),
(2, 'John Doe', 'john@example.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'reseller', '+91 98765 43211', '42 Business Ave, Mumbai', 'Tech Solutions Pvt Ltd', 'john@okaxis', 'REF001', 52, 0.00, 1),
(3, 'David Smith', 'david@example.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'reseller', '+91 98765 43212', '88 Innovation Way, Delhi', 'Apex Digital', 'david@upi', 'REF002', 32, 0.00, 1),
(4, 'Michael Lee', 'michael@example.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'reseller', '+91 98765 43216', '12 Software Hub, Hyderabad', 'Lee Soft', 'michael@okicici', 'REF003', 25, 0.00, 1),
(5, 'Arun Kumar', 'arun@example.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'user', '+91 98765 43213', '15 Garden Street, Chennai', 'Arun Enterprises', 'arun@okaxis', NULL, 0, 1500.00, 1),
(6, 'Ravi Kumar', 'ravi@example.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'user', '+91 98765 43214', '77 Commercial Road, Pune', 'Ravi & Co', 'ravi@upi', NULL, 0, 1000.00, 1),
(7, 'Priya Sharma', 'priya@example.com', '$2y$10$4.T3m50j6R7sU9sK/S8KueZ5V3qP0w/eN3F8Q0w8q3w3a3u3e3u3e', 'user', '+91 98765 43215', '304 Tower B, Sector 62, Noida', 'Sharma Tech', 'priya@okicici', NULL, 0, 800.00, 1)
ON DUPLICATE KEY UPDATE name=VALUES(name), referral_code=VALUES(referral_code);

-- Default Products
INSERT INTO products (id, name, category, description, cost_price, price, current_stock, subscribers_count, revenue, image, status, is_published) VALUES
(1, 'MediaJungle', 'Media & Content', 'Powerful media management software designed for growing businesses to organize, manage, and distribute digital assets efficiently.', 200.00, 500.00, 4, 1245, 622500.00, 'mediajungle.png', 'active', 1),
(2, 'CRM Pro', 'Customer Relations', 'Customer relationship management tool with automated pipelines, contact tracking, and lead analytics.', 400.00, 1000.00, 15, 980, 980000.00, 'crmpro.png', 'active', 1),
(3, 'ProjectHub', 'Project Management', 'Project management made simple with real-time Gantt charts, sprint planning, and team collaboration.', 300.00, 800.00, 20, 765, 612000.00, 'projecthub.png', 'active', 1),
(4, 'InvoiceX', 'Finance & Billing', 'Smart invoicing platform for SaaS, freelancers, and agency teams with automated client billing.', 150.00, 400.00, 3, 2050, 820000.00, 'invoicex.png', 'active', 1),
(5, 'TeamFlow', 'HR & Workflow', 'Complete employee lifecycle management, attendance tracking, and task workflow automation.', 250.00, 600.00, 12, 530, 318000.00, 'teamflow.png', 'active', 1)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Default Orders
INSERT INTO orders (id, order_code, user_id, product_id, reseller_id, amount, payment_method, transaction_id, payment_proof, status, rejection_reason, billing_cycle, start_date, next_billing_date, commission_earned, remarks) VALUES
(1, 'ORD123', 5, 1, 2, 500.00, 'UPI (GPay)', 'T2406012345', 'uploads/proof1.png', 'approved', NULL, 'One-time', '2026-06-01', NULL, 60.00, 'Paid via GPay'),
(2, 'ORD122', 6, 2, 2, 1000.00, 'PhonePe', 'T2406011000', 'uploads/proof2.png', 'approved', NULL, 'One-time', '2026-05-15', NULL, 120.00, 'Paid via PhonePe'),
(3, 'ORD121', 7, 3, 3, 800.00, 'Bank Transfer', 'T2405283344', 'uploads/proof3.png', 'pending', NULL, 'One-time', '2026-05-28', NULL, 80.00, 'Verification pending'),
(4, 'ORD120', 6, 4, NULL, 400.00, 'UPI (GPay)', 'T2405277788', 'uploads/proof4.png', 'rejected', 'Payment screenshot is blurry and transaction ID does not match bank records.', 'One-time', '2026-05-27', NULL, 0.00, 'Needs resubmission')
ON DUPLICATE KEY UPDATE order_code=VALUES(order_code);

-- Seed Purchases for Approved Orders
INSERT INTO purchases (id, order_id, user_id, product_id, reseller_id, amount, status) VALUES
(1, 1, 5, 1, 2, 500.00, 'Approved'),
(2, 2, 6, 2, 2, 1000.00, 'Approved')
ON DUPLICATE KEY UPDATE amount=VALUES(amount);

-- Default Commissions
INSERT INTO commissions (id, order_id, reseller_id, sale_amount, commission_amount, commission_rate, status) VALUES
(1, 1, 2, 500.00, 60.00, 12.00, 'paid'),
(2, 2, 2, 1000.00, 120.00, 12.00, 'paid'),
(3, 3, 3, 800.00, 80.00, 10.00, 'pending')
ON DUPLICATE KEY UPDATE sale_amount=VALUES(sale_amount);