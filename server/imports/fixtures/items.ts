// Collections
import { Items } from '../../../both/collections/items.collection';

// Models
import { Item } from '../../../both/models/item.model';

export function loadItems() {
  if (Items.find().cursor.count() === 0) {
    const items: Item[] = [{
      title: 'Dubstep-Free Zone',
      description: 'Can we please just for an evening not listen to dubstep.'
    }, {
      title: 'All dubstep all the time',
      description: 'Get it on!'
    }, {
      title: 'Savage lounging',
      description: 'Leisure suit required. And only fiercest manners.'
    }];

    items.forEach((item) => Items.insert(item));
  }
}
