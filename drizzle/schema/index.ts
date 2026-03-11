import { relations, sql } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import z from 'zod';

export const users = pgTable('users', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  nic: text().notNull(),
  name: text().notNull(),
  role: text({
    enum: ['ADMIN', 'USER'],
  })
    .default('USER')
    .notNull(),
  password: text().notNull(),
  created_at: timestamp('created_at', { mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const updateUserSchema = createUpdateSchema(users);

export type TSelectUser = z.infer<typeof selectUserSchema>;
export type TInsertUser = z.infer<typeof insertUserSchema>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;

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

export const insertImageSchema = createInsertSchema(images);
export const selectImageSchema = createSelectSchema(images);
export const updateImageSchema = createUpdateSchema(images);

export type TSelectImage = z.infer<typeof selectImageSchema>;
export type TInsertImage = z.infer<typeof insertImageSchema>;
export type TUpdateImage = z.infer<typeof updateImageSchema>;

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

export const insertStoragePlaceSchema = createInsertSchema(storagePlaces);
export const selectStoragePlaceSchema = createSelectSchema(storagePlaces);
export const updateStoragePlaceSchema = createUpdateSchema(storagePlaces);

export type TSelectStoragePlace = z.infer<typeof selectStoragePlaceSchema>;
export type TInsertStoragePlace = z.infer<typeof insertStoragePlaceSchema>;
export type TUpdateStoragePlace = z.infer<typeof updateStoragePlaceSchema>;

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

export const insertItemCodeSchema = createInsertSchema(itemCodes);
export const selectItemCodeSchema = createSelectSchema(itemCodes);
export const updateItemCodeSchema = createUpdateSchema(itemCodes);

export type TSelectItemCode = z.infer<typeof selectItemCodeSchema>;
export type TInsertItemCode = z.infer<typeof insertItemCodeSchema>;
export type TUpdateItemCode = z.infer<typeof updateItemCodeSchema>;

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
  type: text({
    enum: ['PRODUCT', 'ELECTRONIC', 'TOOL'],
  }).notNull(),
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

export const insertItemSchema = createInsertSchema(items);
export const selectItemSchema = createSelectSchema(items);
export const updateItemSchema = createUpdateSchema(items);

export type TSelectItem = z.infer<typeof selectItemSchema>;
export type TInsertItem = z.infer<typeof insertItemSchema>;
export type TUpdateItem = z.infer<typeof updateItemSchema>;

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

export const insertBorrowerSchema = createInsertSchema(borrowers);
export const selectBorrowerSchema = createSelectSchema(borrowers);
export const updateBorrowerSchema = createUpdateSchema(borrowers);

export type TSelectBorrower = z.infer<typeof selectBorrowerSchema>;
export type TInsertBorrower = z.infer<typeof insertBorrowerSchema>;
export type TUpdateBorrower = z.infer<typeof updateBorrowerSchema>;

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
  status: text({
    enum: ['PENDING', 'OVERDUE', 'RETURNED'],
  }),
  returned_date: timestamp({ mode: 'date' }),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const insertBorrowingSchema = createInsertSchema(borrowings);
export const selectBorrowingSchema = createSelectSchema(borrowings);
export const updateBorrowingSchema = createUpdateSchema(borrowings);

export type TSelectBorrowing = z.infer<typeof selectBorrowingSchema>;
export type TInsertBorrowing = z.infer<typeof insertBorrowingSchema>;
export type TUpdateBorrowing = z.infer<typeof updateBorrowingSchema>;

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
    .references(() => items.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  // status: text({ enum: ['RETURNED', 'PENDING'] }).default('PENDING'),
  return_condition: text({
    enum: ['OK', 'DAMAGED'],
  }),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const insertBorrowedItemSchema = createInsertSchema(borrowedItems);
export const selectBorrowedItemSchema = createSelectSchema(borrowedItems);
export const updateBorrowedItemSchema = createUpdateSchema(borrowedItems);

export type TSelectBorrowedItem = z.infer<typeof selectBorrowedItemSchema>;
export type TInsertBorrowedItem = z.infer<typeof insertBorrowedItemSchema>;
export type TUpdateBorrowedItem = z.infer<typeof updateBorrowedItemSchema>;

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
    .references(() => users.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  activity: text().notNull(),
  created_at: timestamp({ mode: 'date' })
    .notNull()
    .default(sql`now()`),
  updated_at: timestamp({ mode: 'date' }).notNull(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs);
export const selectActivityLogSchema = createSelectSchema(activityLogs);
export const updateActivityLogSchema = createUpdateSchema(activityLogs);

export type TSelectActivityLog = z.infer<typeof selectActivityLogSchema>;
export type TInsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type TUpdateActivityLog = z.infer<typeof updateActivityLogSchema>;

export const activityLogRelations = relations(activityLogs, ({ one }) => {
  return {
    user: one(users, {
      fields: [activityLogs.user_id],
      references: [users.id],
    }),
  };
});
