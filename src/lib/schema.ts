import { pgTable, serial, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm'

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  status: varchar('status', { length: 50 }),
  startDate: timestamp('start_date'),
  requestSent: integer('request_sent').default(0),
  requestAccepted: integer('request_accepted').default(0),
  requestReplied: integer('request_replied').default(0),
  conversionRate: integer('conversion_rate').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id').references(() => campaigns.id),
  name: varchar('name', { length: 255 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 512 }).default(sql`NULL`),  // nullable
  description: text('description').default(sql`NULL`),  // nullable text
  activityLevel: integer('activity_level').default(0),
  status: varchar('status', { length: 50 }).default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});