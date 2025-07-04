CREATE TABLE IF NOT EXISTS `whitelist_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discord_id` varchar(255) NOT NULL,
  `discord_username` varchar(255) NOT NULL,
  `character_name` varchar(255) NOT NULL,
  `character_backstory` text NOT NULL,
  `age` int(3) NOT NULL,
  `previous_rp_experience` text,
  `why_join` text NOT NULL,
  `rules_acknowledged` tinyint(1) DEFAULT 1,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `admin_notes` text,
  `reviewed_by` varchar(255),
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `discord_id` (`discord_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
