import { Component, OnDestroy, OnInit } from '@angular/core';
import {Facebook, FacebookApiException} from 'fb';

import { Item } from '../../../../both/models/item.model';
import { Items } from '../../../../both/collections/items.collection';
import { ItemsService } from './shared/items.service';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import template from './items-list.component.html';

@Component({
  selector: 'items-list',
  template: template
})

export class ItemsListComponent implements OnInit, OnDestroy {
  items: Observable<Item[]>;
  itemsSub: Subscription;
  itemsFoundSub: Subscription;
  eventsSub: Subscription;

  constructor(
    private itemsService: ItemsService
  ) {

    this.itemsFoundSub = itemsService.itemsFound$.subscribe(
      items => {
        this.items = items;
      }
    )
  }

  ngOnInit() {
    this.items = Items.find({}).zone();
    this.itemsSub = MeteorObservable.subscribe('items').subscribe();
  }


  removeItem(item: Item): void {
    Items.remove(item._id);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.itemsFoundSub.unsubscribe();
  }
}
