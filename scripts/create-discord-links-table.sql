-- Create the discord_links table to store Discord to game account links
CREATE TABLE IF NOT EXISTS discord_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discord_id VARCHAR(20) NOT NULL UNIQUE,
    discord_username VARCHAR(100) NOT NULL,
    game_username VARCHAR(100) NOT NULL,
    linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_discord_id (discord_id),
    INDEX idx_game_username (game_username)
);

-- Insert some test data (optional)
-- INSERT INTO discord_links (discord_id, discord_username, game_username) 
-- VALUES ('123456789012345678', 'testuser', 'gameuser123');
