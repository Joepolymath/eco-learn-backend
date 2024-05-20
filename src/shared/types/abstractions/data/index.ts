import {
  Document,
  FilterQuery,
  IfAny,
  Require_id,
  Types,
  UnpackedIntersection,
} from 'mongoose';

export interface IDataRepo<T> {
  create(
    instance: Partial<T>
  ): Promise<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>>>;
  save(instance: Partial<T>): Promise<Document<any, any, any> | null>;
  findAll(
    query: {
      filter: FilterQuery<T>;
      skip: number;
      limit: number;
    },
    populateData?: string[],
    selectData?: string
  ): Promise<
    Omit<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>>, never>[]
  >;
  findOne(
    query: FilterQuery<T>,
    populateData?: string[],
    selectData?: string
  ): Promise<UnpackedIntersection<
    IfAny<T, any, Document<unknown, {}, T> & Require_id<T>>,
    {}
  > | null>;
  findAndUpdate(
    query: FilterQuery<T>,
    update: Partial<T>,
    options: { new: boolean }
  ): Promise<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>> | null>;
  findByIdAndDelete(
    query: FilterQuery<T>
  ): Promise<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>> | null>;
  findById(
    _id: string,
    populateData?: string[],
    selectData?: string
  ): Promise<UnpackedIntersection<
    IfAny<T, any, Document<unknown, {}, T> & Require_id<T>>,
    {}
  > | null>;
  deleteOne(
    query: FilterQuery<T>
  ): Promise<IfAny<T, any, Document<unknown, {}, T> & Require_id<T>> | null>;
}
