import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Items } from '../../../../../both/collections/items.collection';
import { Item } from '../../../../../both/models/item.model';

@Injectable()
export class ItemsService {

  private itemsFoundSource = new Subject<Observable<Item[]>>();
  itemsFound$ = this.itemsFoundSource.asObservable();

  findItem(value: string) {
    let items = Items.find(value ? { name: { $regex: value, $options: 'i' } } : {}).zone();
    this.itemsFoundSource.next(items);
  }

}