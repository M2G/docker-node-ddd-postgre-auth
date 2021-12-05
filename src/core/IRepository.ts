import type {
 Document,
  Model,
  UpdateQuery,
  Query,
  Types,
} from "mongoose";

export interface IRead<T extends Document> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id?: Types.ObjectId, callback?: (error: any, result?: Model<T>) => void) => void;
  findOne: ((conditions: any, projection: any,
             callback?: (err: any, res: Model<T> | null) => void) => Query<T | null, T>)
    & ((conditions: any, projection: any, options: any,
        callback?: (err: any, res: Model<T> | null) => void) => Query<T | null, T>)
    & ((conditions?: any,
        callback?: (err: any, res: Model<T> | null) => void) => Query<T | null, T>);

  find: ((callback?: (err: any, res?: Model<T>[]) => void) => Query<T[], T>)
    & ((conditions: any, callback?: (err: any, res?: Model<T>[]) => void) => Query<T[], T>)
    & ((conditions: any, projection?: any | null,
        callback?: (err: any, res?: T[]) => void) => Query<T[], T>)
    & ((conditions: any, projection?: any | null, options?: any | null,
       callback?: (err: any, res?: Model<T>[]) => void) => Query<T[], T>);
}

export interface IWrite<T extends Document> {
  // create: (item: CreateQuery<T>, callback: (error: any, result: T[]) => void) => void;
  create: ((item?: Query<any[], any, {}, any>,
            callback?: (error: any, result?: T[]) => void) => Query<T[], T>);
  update: (_id?: Types.ObjectId, item?: UpdateQuery<T>,
           callback?: (error: any, result: Model<T> | null) => void) => void;
  findByIdAndUpdate: (_id?: Types.ObjectId, item?: UpdateQuery<T>, options?: {
                        new?: boolean; upsert?: boolean; runValidators?: boolean;
                        setDefaultsOnInsert?: boolean; sort?: any; select?: any;
                        rawResult?: any; strict?: any;
                      },
                      callback?: (error: any, result: Model<T> | null) => any) => any;
  findByIdAndDelete: (_id?: Types.ObjectId, item?: UpdateQuery<T>, options?: {},
                      callback?: (error: any, result: Model<T> | null) => any) => any;
}
