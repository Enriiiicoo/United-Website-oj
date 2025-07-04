-- Create discord_links table to connect Discord accounts with game accounts
CREATE TABLE IF NOT EXISTS discord_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord_id VARCHAR(20) NOT NULL UNIQUE,
  discord_username VARCHAR(50) NOT NULL,
  account_id INT NOT NULL,
  account_username VARCHAR(50) NOT NULL,
  linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key to reference the accounts table
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  
  -- Indexes for better performance
  INDEX idx_discord_id (discord_id),
  INDEX idx_account_id (account_id),
  INDEX idx_account_username (account_username)
);
