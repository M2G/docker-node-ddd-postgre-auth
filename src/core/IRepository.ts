import type { Document, Model, UpdateQuery, Query, Types, CreateQuery } from "mongoose";


export interface IRead<T extends Document> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id: string, callback: (error: any, result: Model<T>) => void) => void;
  findOne(conditions?: any, callback?: (err: any, res: Model<T> | null) => void): Query<T | null, T>;
  findOne(conditions: any, projection: any, callback?: (err: any, res: Model<T> | null) => void): Query<T | null, T>;
  findOne(conditions: any, projection: any, options: any, callback?: (err: any, res: Model<T> | null) => void): Query<T | null, T>;

  find(callback?: (err: any, res: Model<T>[]) => void): Query<T[], T>;
  find(conditions: any, callback?: (err: any, res: Model<T>[]) => void): Query<T[], T>;

  find(conditions: any, projection?: any | null,
       callback?: (err: any, res: T[]) => void): Query<T[], T>;

  find(conditions: any, projection?: any | null, options?: any | null,
       callback?: (err: any, res: Model<T>[]) => void): Query<T[], T>;
}

export interface IWrite<T extends Document> {
  create: (item: CreateQuery<T>, callback: (error: any, result: T[]) => void) => void;
  update: (_id: Types.ObjectId, item: UpdateQuery<T>, callback: (error: any, result: any) => void) => void;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
}
