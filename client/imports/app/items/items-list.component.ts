import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facebook, FacebookApiException} from 'fb';
import { is } from 'is_js';

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
  paramsSub: Subscription;
  city: string;

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute
  ) {

    this.itemsFoundSub = itemsService.itemsFound$.subscribe(
      items => {
        this.items = items;
      }
    )
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params["city"])
      .subscribe(city => {
        this.city = city;

        if (city) {
          this.itemsSub = MeteorObservable.subscribe('items', {'place.location.city': city}).subscribe(() => {
            this.items = Items.find({'place.location.city': city}).zone();
          })
        } else {
          this.itemsSub = MeteorObservable.subscribe('items').subscribe(() => {
            this.items = Items.find({}).zone();
          })
        }
      })
  }


  removeItem(item: Item): void {
    Items.remove(item._id);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.itemsFoundSub.unsubscribe();
  }
}
