-- Remove the game_character_id column and add account_id to link with existing accounts table
ALTER TABLE website_users 
DROP COLUMN game_character_id,
ADD COLUMN account_id INT NULL AFTER discord_username,
ADD INDEX idx_account_id (account_id);

-- Optional: Add foreign key constraint if both tables are in the same database
-- ALTER TABLE website_users 
-- ADD CONSTRAINT fk_account_id 
-- FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL;

-- Update verification logs to include account verification
ALTER TABLE verification_logs 
MODIFY COLUMN verification_type ENUM('discord', 'email', 'account') NOT NULL;
