import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

// This small table is enough to learn schema, migration, and querying.
export const sitemapEntries = sqliteTable('sitemap_entries', {
  id: text('id').primaryKey(),
  url: text('url').notNull().unique(),
  lastmod: text('lastmod').notNull(),
})