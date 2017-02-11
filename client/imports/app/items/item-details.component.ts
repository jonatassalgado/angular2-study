import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MeteorObservable } from 'meteor-rxjs';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Item } from '../../../../both/models/item.model';
import { Items } from '../../../../both/collections/items.collection';

import template from './item-details.component.html';

@Component({
    selector: 'item-details',
    template
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
    item: Item;
    itemId: string;
    paramsSub: Subscription;
    itemSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params["itemId"])
            .subscribe(itemId => {
                console.log(this.item)

                this.itemId = itemId;

                if (this.itemSub) {
                    this.itemSub.unsubscribe();
                }

                this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(() => {
                    this.item = Items.findOne(this.itemId);
                })
            })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
    }

}

