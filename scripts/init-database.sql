-- Users table for Discord authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord_id VARCHAR(20) UNIQUE NOT NULL,
  username VARCHAR(32) NOT NULL,
  discriminator VARCHAR(4) NOT NULL,
  avatar VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Character accounts table (MTA server accounts)
CREATE TABLE IF NOT EXISTS mta_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(32) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  serial VARCHAR(32) UNIQUE NOT NULL,
  ip VARCHAR(45),
  money BIGINT DEFAULT 0,
  bank_money BIGINT DEFAULT 0,
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  playtime INT DEFAULT 0, -- in minutes
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  admin_level INT DEFAULT 0,
  vip_level INT DEFAULT 0,
  faction_id INT DEFAULT 0,
  job VARCHAR(50) DEFAULT 'Unemployed'
);

-- Link Discord users to MTA accounts
CREATE TABLE IF NOT EXISTS user_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_id INT NOT NULL,
  is_primary BOOLEAN DEFAULT TRUE,
  linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES mta_accounts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_account (user_id, account_id)
);

-- Characters table
CREATE TABLE IF NOT EXISTS mta_characters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  money BIGINT DEFAULT 500,
  bank_money BIGINT DEFAULT 0,
  health FLOAT DEFAULT 100.0,
  armor FLOAT DEFAULT 0.0,
  skin INT DEFAULT 0,
  interior INT DEFAULT 0,
  dimension INT DEFAULT 0,
  x FLOAT DEFAULT 0.0,
  y FLOAT DEFAULT 0.0,
  z FLOAT DEFAULT 0.0,
  rotation FLOAT DEFAULT 0.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES mta_accounts(id) ON DELETE CASCADE
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS mta_vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL, -- character ID
  model INT NOT NULL,
  x FLOAT DEFAULT 0.0,
  y FLOAT DEFAULT 0.0,
  z FLOAT DEFAULT 0.0,
  rotation FLOAT DEFAULT 0.0,
  color1 INT DEFAULT 0,
  color2 INT DEFAULT 0,
  health FLOAT DEFAULT 1000.0,
  fuel FLOAT DEFAULT 100.0,
  mileage FLOAT DEFAULT 0.0,
  plate VARCHAR(8),
  locked BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES mta_characters(id) ON DELETE CASCADE
);

-- Properties table
CREATE TABLE IF NOT EXISTS mta_properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL, -- character ID
  type ENUM('house', 'business', 'garage') NOT NULL,
  name VARCHAR(100),
  price BIGINT NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  z FLOAT NOT NULL,
  interior INT DEFAULT 0,
  dimension INT DEFAULT 0,
  locked BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES mta_characters(id) ON DELETE CASCADE
);

-- Existing whitelist table (unchanged)
CREATE TABLE IF NOT EXISTS mta_whitelist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord_id VARCHAR(20) UNIQUE NOT NULL,
  added_by VARCHAR(20),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason TEXT
);

-- Existing verifications table (unchanged)
CREATE TABLE IF NOT EXISTS mta_verifications (
  discord_id VARCHAR(20) PRIMARY KEY,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Verification logs
CREATE TABLE IF NOT EXISTS verification_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord_id VARCHAR(20) NOT NULL,
  action ENUM('verify', 'check', 'expire') NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT IGNORE INTO mta_accounts (username, password, serial, money, bank_money, level, experience, playtime, admin_level, vip_level, job) VALUES
('TestPlayer1', 'hashed_password_1', 'SERIAL123456789ABCDEF1', 25000, 150000, 45, 89500, 9360, 0, 2, 'Taxi Driver'),
('TestPlayer2', 'hashed_password_2', 'SERIAL123456789ABCDEF2', 15000, 75000, 32, 45200, 5280, 1, 1, 'Police Officer'),
('TestPlayer3', 'hashed_password_3', 'SERIAL123456789ABCDEF3', 50000, 300000, 67, 156000, 15600, 0, 3, 'Business Owner');

INSERT IGNORE INTO mta_characters (account_id, name, money, bank_money, skin) VALUES
(1, 'John_Doe', 25000, 150000, 0),
(1, 'Jane_Smith', 15000, 50000, 56),
(2, 'Officer_Johnson', 15000, 75000, 280),
(3, 'Rich_Businessman', 50000, 300000, 147);

INSERT IGNORE INTO mta_vehicles (owner_id, model, plate, health, fuel) VALUES
(1, 411, 'PLAYER1', 950.0, 85.5),
(1, 522, 'BIKE001', 1000.0, 100.0),
(2, 596, 'POLICE1', 800.0, 60.0),
(3, 411, 'RICH001', 1000.0, 100.0),
(3, 560, 'RICH002', 1000.0, 95.0),
(3, 487, 'HELI001', 1000.0, 80.0);

INSERT IGNORE INTO mta_properties (owner_id, type, name, price, x, y, z) VALUES
(1, 'house', 'Grove Street House', 50000, 2495.0, -1687.0, 13.5),
(2, 'house', 'Police Station Apartment', 75000, 1555.0, -1675.0, 16.2),
(3, 'business', 'Downtown Casino', 500000, 2020.0, 1007.0, 10.8),
(3, 'house', 'Vinewood Mansion', 1000000, 1260.0, -785.0, 92.0),
(3, 'garage', 'Private Garage', 100000, 1300.0, -800.0, 84.0);
