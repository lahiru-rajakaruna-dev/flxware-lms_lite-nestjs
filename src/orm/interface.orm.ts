import {
  TInsertBorrowedItem,
  TInsertBorrower,
  TInsertBorrowing,
  TInsertImage,
  TInsertItem,
  TInsertStoragePlace,
  TInsertUser,
  TSelectBorrowedItem,
  TSelectBorrower,
  TSelectBorrowing,
  TSelectImage,
  TSelectItem,
  TSelectStoragePlace,
  TSelectUser,
  TUpdateBorrowedItem,
  TUpdateBorrower,
  TUpdateBorrowing,
  TUpdateImage,
  TUpdateItem,
  TUpdateStoragePlace,
  TUpdateUser,
} from '../../drizzle/schema';

export interface IOrmService {
  getDriver(): unknown;
}

export interface IUserManageable {
  createUser(data: TInsertUser): Promise<TSelectUser>;
  updateUser(id: number, updates: TUpdateUser): Promise<TSelectUser>;
  getUser(id: number): Promise<TSelectUser>;
  deleteUser(id: number): Promise<boolean>;
}

export interface IItemManageable {
  createItem(data: TInsertItem): Promise<TSelectItem>;
  updateItem(id: number, updates: TUpdateItem): Promise<TSelectItem>;
  getItem(id: number): Promise<TSelectItem>;
  getAllItems(filters?: Partial<TSelectItem>): Promise<TSelectItem[]>;
  deleteItem(id: number): Promise<boolean>;
}

export interface IStorageManageable {
  createStoragePlace(data: TInsertStoragePlace): Promise<TSelectStoragePlace>;
  updateStoragePlace(
    id: number,
    updates: TUpdateStoragePlace,
  ): Promise<TSelectStoragePlace>;
  getStoragePlace(id: number): Promise<TSelectStoragePlace>;
  getStoragePlaces(
    filters?: Partial<TSelectStoragePlace>,
  ): Promise<TSelectStoragePlace>;
  deleteStoragePlaces(filter: Partial<TSelectStoragePlace>): Promise<boolean>;
}

export interface IBorrowerManageable {
  createBorrower(data: TInsertBorrower): Promise<TSelectBorrower>;
  updateBorrower(
    id: number,
    updates: TUpdateBorrower,
  ): Promise<TSelectBorrower>;
  getBorrower(id: number): Promise<TSelectBorrower>;
  getBorrowers(filters?: Partial<TSelectBorrower>): Promise<TSelectBorrower[]>;
  deleteBorrower(id: number): Promise<boolean>;
}

export interface IBorrowedItemManageable {
  createBorrowedItem(data: TInsertBorrowedItem): Promise<TSelectBorrowedItem>;
  updateBorrowedItem(
    id: number,
    updates: TUpdateBorrowedItem,
  ): Promise<TSelectBorrowedItem>;
  getBorrowedItem(id: number): Promise<TSelectBorrowedItem>;
  getBorrowedItems(
    filter: Partial<TSelectBorrowedItem>,
  ): Promise<TSelectBorrowedItem[]>;
}

export interface IBorrowingManageable {
  createBorrowing(data: TInsertBorrowing): Promise<TSelectBorrowing>;
  updateBorrowing(
    id: number,
    updates: TUpdateBorrowing,
  ): Promise<TSelectBorrowing>;
  getBorrowing(id: number): Promise<TSelectBorrowing>;
  getBorrowings(
    filter?: Partial<TSelectBorrowing>,
  ): Promise<TSelectBorrowing[]>;
  deleteBorrowing(id: number): Promise<boolean>;
}

export interface IImageManageable {
  createFile(data: TInsertImage): Promise<TSelectImage>;
  updateImage(id: number, updates: TUpdateImage): Promise<TSelectImage>;
  getImage(id: number): Promise<TSelectImage>;
  getImages(filter: Partial<TSelectImage>): Promise<TSelectImage[]>;
  deleteImage(id: number): Promise<boolean>;
}
