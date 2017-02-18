import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MeteorObservable } from 'meteor-rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
        private location: Location,
        private router: Router,
    ) {}


    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params["itemId"])
            .subscribe(itemId => {
                this.itemId = itemId;

                if (this.itemSub) {
                    this.itemSub.unsubscribe();
                }

                this.itemSub = MeteorObservable.subscribe('item', this.itemId).subscribe(() => {
                    this.item = Items.findOne(this.itemId);
                })
            })
    }


    delete() {
        Items.remove(this.item._id);
        this.itemSub.unsubscribe();
        this.router.navigate(['/'])
    }


    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.itemSub.unsubscribe();
    }

}

