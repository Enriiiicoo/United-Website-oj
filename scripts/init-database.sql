-- Create users table for website authentication
CREATE TABLE IF NOT EXISTS website_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    discord_id VARCHAR(20) NOT NULL UNIQUE,
    discord_username VARCHAR(100) NOT NULL,
    game_character_id VARCHAR(50) NULL,
    avatar_url TEXT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_discord_id (discord_id),
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_game_character_id (game_character_id)
);

-- Create user sessions table (optional, for custom session management)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES website_users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id)
);

-- Create verification logs table
CREATE TABLE IF NOT EXISTS verification_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    verification_type ENUM('discord', 'email', 'game') NOT NULL,
    status ENUM('pending', 'verified', 'failed') DEFAULT 'pending',
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES website_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_verification_type (verification_type)
);

-- Example: Link to existing game database (adjust table/column names as needed)
-- This assumes you have a game users table you want to link to
-- CREATE TABLE IF NOT EXISTS game_user_links (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     website_user_id INT NOT NULL,
--     game_user_id INT NOT NULL,
--     linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     
--     FOREIGN KEY (website_user_id) REFERENCES website_users(id) ON DELETE CASCADE,
--     -- FOREIGN KEY (game_user_id) REFERENCES your_game_users_table(id) ON DELETE CASCADE,
--     UNIQUE KEY unique_link (website_user_id, game_user_id)
-- );
