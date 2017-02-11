// Models
import { CollectionObject } from './collection-object.model';

export interface Item extends CollectionObject {
  title: string,
  description: string,
  price?: number,
  rate?: number,
  friends?: string[],
  dates?: Date[],
  owner?: string,
  createdAt: Date
}
