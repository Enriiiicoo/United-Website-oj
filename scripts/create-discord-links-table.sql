CREATE TABLE IF NOT EXISTS discord_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discord_id VARCHAR(255) NOT NULL UNIQUE,
    game_username VARCHAR(255) NOT NULL,
    game_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_discord_id ON discord_links(discord_id);
CREATE INDEX idx_game_username ON discord_links(game_username);
