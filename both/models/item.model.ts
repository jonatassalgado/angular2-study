// Models
import { CollectionObject } from './collection-object.model';

export interface Item extends CollectionObject {
  name: string,
  description: string,
  start_time: Date,
  end_time?: Date,
  created_at: number,
  price?: number,
  rate?: number,
  friends?: string[],
  owner?: string,
  cover?: string,
  facebook_id?: string,
  is_canceled?: boolean,
  ticket_uri?: string,
  attending_count?: number,
  place: {
    name: string,
    location: {
      _id: string,
      city: string,
      country: string,
      latitude: number,
      longitude: number,
      state: string,
      street: string,
      zip: string,
      full_address: string
    }
  },
  categories?: Array<string>,
  occassions?: Array<string>,
  activities?: Array<string>
}
