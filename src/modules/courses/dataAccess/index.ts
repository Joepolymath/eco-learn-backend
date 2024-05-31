import { Document, Model } from 'mongoose';
import DAL from '../../../shared/dataAccessLayer/dal';
import { IDataRepo } from '../../../shared/types/abstractions/data';

export default class UserRepo<T extends Document>
  extends DAL<T>
  implements IDataRepo<T>
{
  constructor(model: Model<T>) {
    super(model);
  }
}
