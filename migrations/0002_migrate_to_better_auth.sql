CREATE TABLE IF NOT EXISTS `user` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `email_verified` integer DEFAULT false NOT NULL,
  `image` text,
  `created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  `updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `user_email_unique`
  ON `user` (`email`);

CREATE TABLE IF NOT EXISTS `session` (
  `id` text PRIMARY KEY NOT NULL,
  `expires_at` integer NOT NULL,
  `token` text NOT NULL,
  `created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  `updated_at` integer NOT NULL,
  `ip_address` text,
  `user_agent` text,
  `user_id` text NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade
);

CREATE UNIQUE INDEX IF NOT EXISTS `session_token_unique`
  ON `session` (`token`);

CREATE INDEX IF NOT EXISTS `session_userId_idx`
  ON `session` (`user_id`);

CREATE TABLE IF NOT EXISTS `account` (
  `id` text PRIMARY KEY NOT NULL,
  `account_id` text NOT NULL,
  `provider_id` text NOT NULL,
  `user_id` text NOT NULL,
  `access_token` text,
  `refresh_token` text,
  `id_token` text,
  `access_token_expires_at` integer,
  `refresh_token_expires_at` integer,
  `scope` text,
  `password` text,
  `created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `account_userId_idx`
  ON `account` (`user_id`);

CREATE TABLE IF NOT EXISTS `verification` (
  `id` text PRIMARY KEY NOT NULL,
  `identifier` text NOT NULL,
  `value` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  `updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);

CREATE INDEX IF NOT EXISTS `verification_identifier_idx`
  ON `verification` (`identifier`);

INSERT OR IGNORE INTO `user` (
  `id`,
  `name`,
  `email`,
  `email_verified`,
  `image`,
  `created_at`,
  `updated_at`
)
SELECT
  `id`,
  `name`,
  lower(`email`),
  1,
  `picture`,
  COALESCE(CAST(unixepoch(`created_at`) * 1000 AS integer), CAST(unixepoch('subsecond') * 1000 AS integer)),
  COALESCE(CAST(unixepoch(`updated_at`) * 1000 AS integer), CAST(unixepoch('subsecond') * 1000 AS integer))
FROM `users`;

DROP TABLE IF EXISTS `auth_sessions`;
DROP TABLE IF EXISTS `users`;
