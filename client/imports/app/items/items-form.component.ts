import { Route, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';

// Templates
import template from './items-form.component.html';

// Collections
import { Items } from '../../../../both/collections/items.collection';

@Component({
  selector: 'items-form',
  template,
  providers: [DatePipe]
})

export class ItemsFormComponent implements OnInit, OnDestroy {
  cover: string;
  facebookLink: string;
  addForm: FormGroup;
  events: Object;
  eventsSub: Subscription;
  isFetchedWithSuccess: boolean;
  isWritted: boolean;
  itemCache: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.isFetchedWithSuccess = false;
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
      Items.insert(
        Object.assign(
          {},
          this.addForm.value,
          {
            owner: Meteor.userId(),
            created_at: Date.now(),
            cover: this.itemCache.cover.source,
            facebook_link: {
              place: {
                location: this.itemCache.place.location
              }
            }
          }
        )
      );

      this.router.navigate(['/']);
    }
  }


  private fetchFacebookResult(response): void {
    this.itemCache = response;
    this.isFetchedWithSuccess = true;
    this.isWritted = true;
    this.cover = this.itemCache.cover.source;

    this.addForm.patchValue({
      name: response.name,
      description: response.description,
      start_time: this.datepipe.transform(response.start_time, 'yyyy-MM-dd'),
      end_time: this.datepipe.transform(response.end_time, 'yyyy-MM-dd'),
      place_name: response.place.name,
      ticket_uri: response.ticket_uri
    });
  }


  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

}
