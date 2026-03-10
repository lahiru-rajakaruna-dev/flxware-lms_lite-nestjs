import { relations, sql } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  nic: text().notNull(),
  name: text().notNull(),
  role: text({ enum: ['ADMIN', 'USER'] }).default('USER'),
  password: text().notNull(),
  created_at: timestamp('created_at', { mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const userRelations = relations(users, ({ many }) => {
  return {
    activities: many(activityLogs),
  };
});

export const images = pgTable('images', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const imageRelations = relations(images, () => {
  return {};
});

export const storagePlaces = pgTable('storage_places', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  cupboard_label: text().notNull(),
  rack_label: text().notNull(),
  bucket_label: text().notNull(),
  created_at: timestamp('created_at', { mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const storagePlaceRelations = relations(storagePlaces, ({ many }) => {
  return {
    items: many(items),
  };
});

export const itemCodes = pgTable('item_codes', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  code: text().notNull(),
  label: text().notNull(),
  created_at: timestamp('created_at', { mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const itemCodeRelations = relations(itemCodes, ({ many }) => {
  return {
    items: many(items),
  };
});

export const items = pgTable('items', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  serial: text().notNull(),
  code_id: bigint({ mode: 'number' })
    .notNull()
    .references(() => itemCodes.id, {
      onUpdate: 'cascade',
      onDelete: 'restrict',
    }),
  storage_place_id: bigint({ mode: 'number' })
    .notNull()
    .references(() => storagePlaces.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  type: text({ enum: ['PRODUCT', 'ELECTRONIC', 'TOOL'] }).notNull(),
  name: text().notNull(),
  description: text().notNull(),
  image_id: bigint({ mode: 'number' }).references(() => images.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  status: text({
    enum: ['IN_STORE', 'BORROWED', 'DAMAGED', 'MISSING'],
  }).default('IN_STORE'),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const itemRelations = relations(items, ({ many, one }) => {
  return {
    item_code: one(itemCodes, {
      fields: [items.code_id],
      references: [itemCodes.id],
    }),
    storage_place: one(storagePlaces, {
      fields: [items.storage_place_id],
      references: [storagePlaces.id],
    }),
    image: one(images, {
      fields: [items.image_id],
      references: [images.id],
    }),
    borrowed_items: many(borrowedItems),
  };
});

export const borrowers = pgTable('borrowers', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  nic: text().notNull().unique(),
  name: text().notNull(),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const borrowerRelations = relations(borrowers, ({ many }) => {
  return {
    borrowings: many(borrowings),
  };
});

export const borrowings = pgTable('borrowings', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  borrower_id: bigint({ mode: 'number' })
    .notNull()
    .references(() => borrowers.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  borrowed_date: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  expected_return_date: timestamp({ mode: 'date' }).notNull(),
  status: text({ enum: ['PENDING', 'OVERDUE', 'RETURNED'] }),
  returned_date: timestamp({ mode: 'date' }),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const borrowingRelations = relations(borrowings, ({ one, many }) => {
  return {
    borrower: one(borrowers, {
      fields: [borrowings.borrower_id],
      references: [borrowers.id],
    }),
    borrowed_items: many(borrowedItems),
  };
});

export const borrowedItems = pgTable('borrowed_items', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  borrowing_id: bigint({ mode: 'number' })
    .notNull()
    .references(() => borrowings.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  item_id: bigint({ mode: 'number' })
    .notNull()
    .references(() => items.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  // status: text({ enum: ['RETURNED', 'PENDING'] }).default('PENDING'),
  return_condition: text({ enum: ['OK', 'DAMAGED'] }),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const borrowedItemRelations = relations(borrowedItems, ({ one }) => {
  return {
    borrowing: one(borrowings, {
      fields: [borrowedItems.borrowing_id],
      references: [borrowings.id],
    }),
    item: one(items, {
      fields: [borrowedItems.item_id],
      references: [items.id],
    }),
  };
});

export const activityLogs = pgTable('activity_log', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  user_id: bigint({ mode: 'number' })
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  activity: text().notNull(),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const activityLogRelations = relations(activityLogs, ({ one }) => {
  return {
    user: one(users, {
      fields: [activityLogs.user_id],
      references: [users.id],
    }),
  };
});
