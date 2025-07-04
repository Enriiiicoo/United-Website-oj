-- Create MTA whitelist table (matches your MTA script)
CREATE TABLE IF NOT EXISTS `mta_whitelist` (
  `mta_serial` VARCHAR(32) PRIMARY KEY,
  `discord_id` VARCHAR(20) NOT NULL,
  `added_by` VARCHAR(32) NOT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create MTA verifications table (matches your MTA script)
CREATE TABLE IF NOT EXISTS `mta_verifications` (
  `discord_id` VARCHAR(20) PRIMARY KEY,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create permanent verifications table (matches your MTA script)
CREATE TABLE IF NOT EXISTS `permanent_verifications` (
  `discord_id` VARCHAR(20) PRIMARY KEY,
  `verified_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add indexes for better performance
CREATE INDEX idx_mta_whitelist_discord_id ON mta_whitelist(discord_id);
CREATE INDEX idx_mta_verifications_expires ON mta_verifications(expires_at);
