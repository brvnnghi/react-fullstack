CREATE TABLE IF NOT EXISTS `sitemap_entries` (
  `id` text PRIMARY KEY NOT NULL,
  `url` text NOT NULL,
  `lastmod` text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `sitemap_entries_url_unique`
  ON `sitemap_entries` (`url`);
