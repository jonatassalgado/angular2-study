import { Route, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';
import { ItemsService } from './shared/items.service';

import template from './items-form.component.html';
import { Items } from '../../../../both/collections/items.collection';

@Component({
  selector: 'items-form',
  template,
  providers: [DatePipe]
})

export class ItemsFormComponent implements OnInit, OnDestroy, AfterViewChecked {
  cover: string;
  facebookLink: string;
  addForm: FormGroup;
  events: Object;
  eventsSub: Subscription;
  isFetchedWithSuccess: boolean;
  isWritterMode: boolean;
  itemCache: any;
  categories: Array<string>;
  occassions: Array<string>;
  activities: Array<string>;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private itemsService: ItemsService
  ) {
    this.isFetchedWithSuccess = false;
    this.categories = itemsService.getCategories();
    this.occassions = itemsService.getOccasions();
    this.activities = itemsService.getActivities();
  }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      price: [],
      rate: [],
      start_time: ['', Validators.required],
      end_time: [],
      place_name: ['', Validators.required],
      ticket_uri: []
    });
  }


  ngAfterViewChecked() {

  }

  searchInFacebook(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a party');
      return;
    }

    if (this.facebookLink) {
      this.eventsSub = MeteorObservable.call("getEventFromFB", {
        id: this.facebookLink
      }).subscribe((response: any) => {
        this.fetchFacebookResult(response);
      }, (err) => {
        console.log(err)
      });
    }
  }


  saveItemInDB(): void {
    if (this.addForm.valid) {
      const categories = $('.ui.categories.dropdown').dropdown('get value');
      const occassions = $('.ui.occassions.dropdown').dropdown('get value');
      const activities = $('.ui.activities.dropdown').dropdown('get value');

      Items.insert(
        Object.assign(
          {},
          this.addForm.value,
          {
            owner: Meteor.userId(),
            created_at: Date.now(),
            cover: this.itemCache.cover.source,
            facebook_id: this.facebookLink,
            categories: categories,
            occassions: occassions,
            activities: activities,
            place: {
              location: this.itemCache.place.location
            }

          }
        )
      );

      this.router.navigate(['/']);
    }
  }


  activeWritterMode() {
    this.isWritterMode = true;

    setTimeout(() => {
      $('.ui.dropdown').dropdown();
    }, 500)
  }


  private fetchFacebookResult(response): void {
    this.itemCache = response;
    this.isFetchedWithSuccess = true;
    this.isWritterMode = true;
    this.cover = this.itemCache.cover.source;

    this.addForm.patchValue({
      name: response.name,
      description: response.description,
      start_time: this.datepipe.transform(response.start_time, 'yyyy-MM-dd'),
      end_time: this.datepipe.transform(response.end_time, 'yyyy-MM-dd'),
      place_name: response.place.name,
      ticket_uri: response.ticket_uri
    });

    setTimeout(() => {
      $('.ui.dropdown').dropdown();
    }, 500)
  }


  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

}
