-- Create MTA whitelist table
CREATE TABLE IF NOT EXISTS `mta_whitelist` (
  `mta_serial` VARCHAR(32) PRIMARY KEY,
  `discord_id` VARCHAR(20) NOT NULL,
  `added_by` VARCHAR(32) NOT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_discord_id` (`discord_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create MTA verifications table
CREATE TABLE IF NOT EXISTS `mta_verifications` (
  `discord_id` VARCHAR(20) PRIMARY KEY,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create permanent verifications table (already exists but ensuring it's here)
CREATE TABLE IF NOT EXISTS `permanent_verifications` (
  `discord_id` VARCHAR(20) PRIMARY KEY,
  `verified_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
