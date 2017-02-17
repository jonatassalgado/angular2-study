// Collections
import {
  Items
} from '../../../both/collections/items.collection';

// Models
import { Item } from '../../../both/models/item.model';

export function loadItems() {
  if (Items.find().cursor.count() === 0) {
    const items: Item[] = [{
      name: 'Dubstep-Free Zone',
      description: 'Can we please just for an evening not listen to dubstep.',
      createdAt: Date.now(),
      start_time: new Date(),
      place: {
        name: "Lancheria do Parque",
        location: {
          _id: "adlsdkjsaldj",
          city: "Porto Alegre",
          country: "Brasil",
          latitude: -30.035259,
          longitude: -51.211374,
          state: "RS",
          street: "Av. Júlio de Castilhos, 300",
          zip: "90010-221",
          full_address: "Avenida Júlio de Castilhos, 300 - Porto Alegre"
        }
      }
    }, {
      name: 'All dubstep all the time',
      description: 'Get it on!',
      createdAt: Date.now(),
      start_time: new Date(),
            place: {
        name: "Lancheria do Parque",
        location: {
          _id: "adlsdkjsaldj",
          city: "Porto Alegre",
          country: "Brasil",
          latitude: -30.035259,
          longitude: -51.211374,
          state: "RS",
          street: "Av. Júlio de Castilhos, 300",
          zip: "90010-221",
          full_address: "Avenida Júlio de Castilhos, 300 - Porto Alegre"
        }
      }
    }, {
      name: 'Savage lounging',
      description: 'Leisure suit required. And only fiercest manners.',
      createdAt: Date.now(),
      start_time: new Date(),
            place: {
        name: "Lancheria do Parque",
        location: {
          _id: "adlsdkjsaldj",
          city: "Porto Alegre",
          country: "Brasil",
          latitude: -30.035259,
          longitude: -51.211374,
          state: "RS",
          street: "Av. Júlio de Castilhos, 300",
          zip: "90010-221",
          full_address: "Avenida Júlio de Castilhos, 300 - Porto Alegre"
        }
      }
    }];

    items.forEach((item) => Items.insert(item));
  }
}