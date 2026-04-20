CREATE TABLE IF NOT EXISTS `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `picture` text,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `users_email_unique`
  ON `users` (`email`);

CREATE TABLE IF NOT EXISTS `auth_sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `token_hash` text NOT NULL,
  `expires_at` text NOT NULL,
  `created_at` text NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS `auth_sessions_token_hash_unique`
  ON `auth_sessions` (`token_hash`);

CREATE INDEX IF NOT EXISTS `auth_sessions_user_id_idx`
  ON `auth_sessions` (`user_id`);

CREATE INDEX IF NOT EXISTS `auth_sessions_expires_at_idx`
  ON `auth_sessions` (`expires_at`);
