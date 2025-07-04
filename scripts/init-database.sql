-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS united_server;
USE united_server;

-- Your existing whitelist table structure
CREATE TABLE IF NOT EXISTS mta_whitelist (
    mta_serial VARCHAR(32) PRIMARY KEY,
    discord_id VARCHAR(20) NOT NULL,
    added_by VARCHAR(32) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Modified verification table for 5-minute verification
CREATE TABLE IF NOT EXISTS mta_verifications (
    discord_id VARCHAR(20) PRIMARY KEY,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Server statistics table
CREATE TABLE IF NOT EXISTS server_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    online_players INT DEFAULT 0,
    max_players INT DEFAULT 100,
    uptime_percentage DECIMAL(5,2) DEFAULT 99.9,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial server stats
INSERT INTO server_stats (online_players, max_players, uptime_percentage) 
VALUES (45, 100, 99.9) 
ON DUPLICATE KEY UPDATE last_updated = CURRENT_TIMESTAMP;

-- Create index for better performance
CREATE INDEX idx_verification_expires ON mta_verifications(expires_at);
CREATE INDEX idx_whitelist_discord ON mta_whitelist(discord_id);
